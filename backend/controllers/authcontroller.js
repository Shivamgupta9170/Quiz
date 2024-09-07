const User = require('../model/user');
const Otp = require('../model/otpSchema');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('../helpers/mailer');
const { threeMinuteExpiry } = require('../helpers/otpValidate');

// Register a new user
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg: 'Validation errors',
            errors: errors.array()
        });
    }

    const { name, email, password } = req.body;
    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
        return res.status(400).json({
            success: false,
            msg: 'Email already exists',
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ name, email, password: hashPassword });
        const userData = await user.save();

        res.status(201).json({
            success: true,
            msg: 'User registered successfully',
            data: userData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

// Generate JWT token
const generateAccessToken = (user) => {
    const payload = { userId: user._id.toString() };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });
};

// User login
const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation errors',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        if (!userData || !(await bcrypt.compare(password, userData.password))) {
            return res.status(400).json({
                success: false,
                msg: 'Email or password is incorrect',
            });
        }

        const accessToken = generateAccessToken(userData);

        res.status(200).json({
            success: true,
            msg: 'User logged in successfully',
            accessToken,
            tokenType: 'Bearer',
            data: userData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

// Generate a random 4-digit OTP
const generateRandom4digit = () => Math.floor(1000 + Math.random() * 9000);

// Send OTP
const sendOtp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { email } = req.body;
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                success: false,
                msg: "Email doesn't exist!"
            });
        }

        if (userData.is_Varified === 1) {
            return res.status(400).json({
                success: false,
                msg: `${userData.email} mail is already verified!`
            });
        }

        const gotp = generateRandom4digit();
        const oldOtpData = await Otp.findOne({ user_id: userData._id });

        if (oldOtpData && !(await threeMinuteExpiry(oldOtpData.timestamp))) {
            return res.status(400).json({
                success: false,
                msg: "Please try again after three minutes."
            });
        }

        await Otp.findOneAndUpdate(
            { user_id: userData._id },
            { otp: gotp, timestamp: new Date() },
            { upsert: true, new: true, setDefaultOnInsert: true }
        );

        const msg = `<p>Hi <b>${userData.name}</b>, your OTP is <h4>${gotp}</h4></p>`;
        mailer.sendMail(userData.email, 'OTP Verification', msg);

        return res.status(200).json({
            success: true,
            msg: 'OTP has been sent, please check your email.',
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

// Verify OTP and log in the user
const verifyOtp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }
        const { user_id, otp } = req.body;

        // Find OTP data for the user
        const otpData = await Otp.findOne({ user_id, otp });
        if (!otpData) {
            return res.status(400).json({
                success: false,
                msg: 'You entered an incorrect OTP'
            });
        }

        // Check if OTP has expired
        const isOtpExpired = await threeMinuteExpiry(otpData.timestamp);
        if (isOtpExpired) {
            return res.status(400).json({
                success: false,
                msg: 'Your OTP has expired'
            });
        }

        // Mark the user as verified
        const updatedUser = await User.findByIdAndUpdate(
            { _id: user_id },
            { $set: { is_Varified: 1 } },
            { new: true } // Return the updated user document
        );

        // Generate access token for immediate login
        const accessToken = generateAccessToken(updatedUser);

        return res.status(200).json({
            success: true,
            msg: 'Account verified successfully, you are now logged in',
            accessToken,
            tokenType: 'Bearer',
            data: updatedUser
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    sendOtp,
    verifyOtp
};



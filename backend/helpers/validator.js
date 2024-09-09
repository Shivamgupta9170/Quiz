const { check } = require('express-validator');
const User = require('../model/user');

exports.registerValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name must be at least 4 characters long')
        .isLength({ min: 4 })
        .custom(async (name) => {
            const existingUser = await User.findOne({ name });
            if (existingUser) {
                throw new Error('Name already in use');
            }
        }),
    check('email', 'Please include a valid email')
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true })
        .custom(async (email) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already in use');
            }
        }),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

exports.loginValidator = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'Password is required').not().isEmpty(),
];

exports.otpMailValidator = [
    check('email','please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    })
];

exports.verifyOtpValidator = [
    check('user_id',"user Id is required").not().isEmpty(),
    check('otp',"otp is required").not().isEmpty()
];


exports.quizValidationRules = [
    check('title')
        .notEmpty()
        .withMessage('Quiz title is required')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long'),
    check('description')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Description cannot be longer than 200 characters'),
];


exports.questionValidationRules = [
    check('questionText')
        .notEmpty()
        .withMessage('Question text is required'),
    check('options')
        .isArray({ min: 4, max: 4 })
        .withMessage('There must be exactly 4 options'),
    check('correctAnswer')
        .notEmpty()
        .withMessage('Correct answer is required')
];


exports.userAnswerValidationRules = [
    check('userId')
        .isMongoId().withMessage('Invalid user ID format')
        .not().isEmpty().withMessage('User ID is required'),

    check('quizId')
        .isMongoId().withMessage('Invalid quiz ID format')
        .not().isEmpty().withMessage('Quiz ID is required'),

    check('questionId')
        .isMongoId().withMessage('Invalid question ID format')
        .not().isEmpty().withMessage('Question ID is required'),

    check('selectedAnswer')
        .isString().withMessage('Selected answer must be a string')
        .not().isEmpty().withMessage('Selected answer is required'),
];











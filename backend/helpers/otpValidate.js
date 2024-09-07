const threeMinuteExpiry = async (otpTime) => {
    try {
        console.log('Timestamp is:- ' + otpTime);

        const d = new Date();
        var differenceValue = (otpTime - d.getTime()) / 1000; // Difference in seconds
        differenceValue = differenceValue / 60; // Convert to minutes

        console.log(differenceValue); // Use console.log to print differenceValue
        if (Math.abs(differenceValue) > 3) {
            return true; // Expired if more than 1 minute difference
        }
        return false; // Not expired if within 1 minute
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    threeMinuteExpiry
};

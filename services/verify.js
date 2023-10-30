

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;

const client = require("twilio")(accountSid, authToken);

// Function to send verification request
async function sendVerificationRequest() {
  try {
    const verification = await client.verify.v2.services(verifySid).verifications.create({
      to: "+14386802255",
      channel: "sms",
    });
    console.log(verification.status);
  } catch (error) {
    console.error("Error sending verification request:", error);
  }
}

// Function to check verification status
async function checkVerificationStatus(otpCode) {
  try {
    const verification_check = await client.verify.v2.services(verifySid).verificationChecks.create({
      to: "+14386802255",
      code: otpCode,
    });

    const handleVerificationStatus = (status) => {
      console.log("Thanks for adding the correct OTP - " + status);
    };
    handleVerificationStatus(verification_check.status);
  } catch (error) {
    console.error("Error checking verification status:", error);
  }
}

module.exports = {
    sendVerificationRequest,
    checkVerificationStatus
  };
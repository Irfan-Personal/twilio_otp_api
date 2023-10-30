const readline = require("readline");
require('dotenv').config();

const { sendVerificationRequest, checkVerificationStatus } = require("./services/verify");
// Main function
async function app() {
  await sendVerificationRequest();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Please enter the OTP: ", (otpCode) => {
    checkVerificationStatus(otpCode)
      .finally(() => rl.close());
  });
}

app();

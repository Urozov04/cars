import otp from "otp-generator";

export const generateOtp = () => {
  return otp.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
};

import bcrypt from "bcrypt";

export const encode = async (password) => {
  const salt = await bcrypt.hash(password, 10);
  return salt
};

export const decode = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

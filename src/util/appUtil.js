import bcrypt from 'bcryptjs-react';

const encodeValue = async (value) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(value, salt);
    return hashedValue;
  } catch (error) {
    throw error;
  }
};



export { encodeValue};
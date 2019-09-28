import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;

// TODO: Generate Token
const generateToken = async (payload: object) => {
  try {
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
    return token;
  } catch (err) {
    console.error(err);
  }
};

export default generateToken;

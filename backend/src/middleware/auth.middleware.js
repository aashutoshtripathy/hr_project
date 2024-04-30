import jwt from 'jsonwebtoken';
import  {asyncHandler}  from '../utils/asyncHandler.js';
import  {ApiError}  from '../utils/ApiError.js';
// import ApiResponse from './path/to/ApiResponse.js';

const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json(new ApiError(401, 'Access denied. No token provided.')) 
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json(new ApiError(401, 'Invalid Token.')) 
  }
});

export default verifyToken;
 
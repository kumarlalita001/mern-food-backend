import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { auth }  from 'express-oauth2-jwt-bearer';
import User from "../models/user.model";
import ApiError from "../utils/apiError";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUE_BASE_URL,
  tokenSigningAlg: 'RS256'
});



export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new ApiError(401,"Unauthorized")
  }

  // Bearer lshdflshdjkhvjkshdjkvh34h5k3h54jkh
  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id });

    if (!user) {
      throw new ApiError(401,"Unauthorized")
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    throw new ApiError(401,"ERROR IN JWT PARSE");
  }
};

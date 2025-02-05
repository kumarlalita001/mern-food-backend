import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/apiError";
import User from "../models/user.model";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { auth0Id } = req.body;

  const isAlreadyExist = await User.findOne({ auth0Id });

  if (isAlreadyExist) {
    //throw new ApiError(400,"UserAlready");
    res.status(200).json(new ApiResponse(200, {}, "User Already Exist"));
  }

  const newUser = new User(req.body);
  await newUser.save();
  res
    .status(200)
    .json(new ApiResponse(200, newUser, "User Account Created Successfully"));
});
export const updateCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      throw new ApiError(401, "User Not Found");
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.status(200).json(new ApiResponse(200, user, "Nice register"));
  }
);
export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {

    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      throw new ApiError(400,"User Not Found");

    }
    res.status(200).json(new ApiResponse(200, currentUser, "Nice register"));
  }
);


export const registe2 = asyncHandler(async (req: Request, res: Response) => {
  throw new ApiError(409, "Conflit");
  res.status(200).json(new ApiResponse(200, {}, "Nice register"));
});

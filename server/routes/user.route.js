import express from "express";
import {
  signUpUser,
  loginUser,
  logoutUser,
  refreshTokens,
  getUserProfile,
  updateProfile,
  getAdminUsers
} from "../controllers/user.controller.js";
import {
  checkAuth,
  checkIsAdmin,
  validateAdminSignUpData,
} from "../middlewares/user.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", validateAdminSignUpData, signUpUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/refresh-token", refreshTokens);
userRouter.get("/profile", checkAuth, getUserProfile);
userRouter.post("/update-profile", checkAuth, updateProfile);
userRouter.get("/admins", checkAuth, checkIsAdmin, getAdminUsers);
userRouter.get("/check", checkAuth, (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Check Auth Controller Error " + error.message);
    return res.status(500).json({ message: error.message });
  }
});

export default userRouter;

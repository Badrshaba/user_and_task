import { Router } from "express";
import * as userController from "./user.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isSuperAdmin } from "../../middlewares/isAdim.middleware.js";
import {
  changePasswordValid,
  logInValid,
  signUpValid,
  updateUserValid,
  validate,
} from "./user.validat.js";
import { multerMiddle } from "../../middlewares/multer.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
const router = Router();

router.post(
  "/",
  signUpValid(),
  validate,
  expressAsyncHandler(userController.signUp)
);
router.post(
  "/login",
  logInValid(),
  validate,
  expressAsyncHandler(userController.logIn)
);
router.patch(
  "/",
  auth(),
  changePasswordValid(),
  validate,
  expressAsyncHandler(userController.changePassword)
);
router.put(
  "/",
  auth(),
  updateUserValid(),
  validate,
  expressAsyncHandler(userController.updateUser)
);
router.delete("/", auth(), expressAsyncHandler(userController.deleteUser));
router.delete("/soft", auth(), expressAsyncHandler(userController.softDelete));
router.get("/", auth(), isAdmin(), expressAsyncHandler(userController.getUser));
router.put(
  "/create_admin",
  auth(),
  isSuperAdmin(),
  expressAsyncHandler(userController.createAdmin)
);
router.post(
  "/profile_picture",
  auth(),
  multerMiddle({
    extensions: allowedExtensions.image,
    filePath: "customers/profiles",
  }).single("profile"),
  expressAsyncHandler(userController.profile_picture)
);

export default router;

import { body, validationResult } from "express-validator";

//===================== signup valid =====================//

export const signUpValid = () => {
  return [
    body("username").exists().withMessage("username is requered").isLength({min:3}).withMessage("short username"),
    body("email").exists().withMessage("email is requered").isEmail().withMessage("enter anther email"),
    body("password").exists().withMessage("password is requered").isString().withMessage("password must be text").isLength({min:3}).withMessage("password is short"),
    body("age").isNumeric().withMessage("age must be number").optional(),
    body("gender").isString().withMessage("invalid gender").optional(),
    body("phone").isString().withMessage("phone must be text").optional()
  ];
};

//===================== login valid =====================//

export const logInValid = () => {
  return [
    body("email").exists().withMessage("email is requered").isEmail().withMessage("enter anther email"),
    body("password").exists().withMessage("password is requered").isString().withMessage("password must be text").isLength({min:3}).withMessage("password is short"),
  ];
};

//===================== change password valid =====================//

export const changePasswordValid = () => {
  return [
    body("password").exists().withMessage("password is requered").isString().withMessage("password must be text").isLength({min:3}).withMessage("password is short"),
  ];
};

//===================== update user valid =====================//

export const updateUserValid = () => {
  return [
    body("username").exists().withMessage("username is requered").isLength({min:3}).withMessage("short username").optional(),
    body("age").isNumeric().withMessage("age must be number").optional(),
  ];
};

//===================== result validate =====================//

export const validate = (req, res, next) => {
  const error = validationResult(req)
    
  if (!error.isEmpty()) return res.status(400).json({message:"catch error",error :error.array()})
  next();
};
 
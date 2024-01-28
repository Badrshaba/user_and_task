import { body, validationResult } from "express-validator";

//===================== add task valid =====================//

export const addTaskValid = () => {
  return [
    body("title").exists().withMessage("title is requered").isLength({min:3}).withMessage("short title"),
    body("description").exists().withMessage("description is requered").isLength({min:10}).withMessage("short description"),
    body("assignTo").exists().withMessage("assign to is requered").isLength({min:24}).withMessage("invalid id"),
    body("deadline").exists().withMessage("deadline is requered")
  ];
};

//===================== update task valid =====================//

export const updateTaskValid = () => {
  return [
    body("_id").exists().withMessage("_id to is requered").isLength({min:24}).withMessage("invalid id"),
    body("title").isString().withMessage("title is must be text").isLength({min:3}).withMessage("short title").optional(),
    body("description").isString().withMessage("description is must be text").isLength({min:10}).withMessage("short description").optional(),
    body("assignTo").isString().withMessage("assign to is must be text").isLength({min:24}).withMessage("invalid id").optional(),
    body("status").isString().withMessage("status is must be text").optional()
  ];
};


//===================== result validate =====================//

export const validate = (req, res, next) => {
  const error = validationResult(req)
    
  if (!error.isEmpty()) return res.status(400).json({message:"catch error",error :error.array()})
  next();
};
 
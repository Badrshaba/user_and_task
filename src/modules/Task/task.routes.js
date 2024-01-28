import { Router } from "express";
import * as taskController from './task.controller.js'
import { auth } from "../../middlewares/auth.middleware.js";
import expressAsyncHandler from "express-async-handler";
import { addTaskValid, updateTaskValid, validate } from "./task.validate.js";
const router = Router()

router.post('/',auth(),addTaskValid(),validate,expressAsyncHandler(taskController.addTask))
router.put('/',auth(),updateTaskValid(),validate,expressAsyncHandler(taskController.updateTask))
router.delete('/',auth(),expressAsyncHandler(taskController.deleteTask))
router.get('/getAllData',expressAsyncHandler(taskController.getTaskWithUser))
router.get('/',auth(),expressAsyncHandler(taskController.getTaskWithOneUser))
router.get('/notDone',expressAsyncHandler(taskController.tasksNotDone))

export default router 
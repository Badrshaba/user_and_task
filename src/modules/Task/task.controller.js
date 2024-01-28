//db.tasks.find({ "deadline": { "$lt": ISODate("2024-01-01T00:00:00.000Z") } })
import Task from "../../../DB/models/task.model.js";
import User from "../../../DB/models/user.model.js";



//===================== add task =====================//

export const addTask = async (req, res, next) => {
  const { title, description, assignTo, deadline } = req.body;
  const { _id } = req.authUser;
  // check assign to
  const user = await User.findById(assignTo);
  if (!user)
    return next(new Error("not found user to assignTo", { cause: 404 }));
  // create
  await Task.create({ title, description, assignTo, deadline, userID: _id });
  res.status(201).json({
    message: "success",
  });
};


//===================== update task =====================//

export const updateTask = async (req, res, next) => {
    const { _id, title, description, status ,assignTo } = req.body;
    const userID = req.authUser._id;

    // check assign to
    const user = await User.findById(assignTo);
    if (!user)
      return next(new Error("not found user to assignTo", { cause: 404 }));
    // update
    const taskUpdat = await Task.updateOne({userID,_id},{ title, description, assignTo,status });
    // faild
    if(!taskUpdat.modifiedCount)return next(new Error('faild update', { cause: 404 }))
    // sucess
    res.status(200).json({
      message: "success",
    });
  };


//===================== delete task =====================//

export const deleteTask = async (req, res, next) => {
    const { _id } = req.body;
    const userID = req.authUser._id;
    // delete
    const taskUpdat = await Task.deleteOne({userID,_id});
    // faild
    if(!taskUpdat.deletedCount)return next(new Error('faild delete', { cause: 400 }))
    // success
    res.status(200).json({
      message: "success",
    });
  };  


//===================== get all tasks with users =====================//

export const getTaskWithUser = async (req, res, next) => {

    const tasksAndUsers = await Task.find().populate([{path:'userID'},{path:'assignTo'}])
    // success
    res.status(200).json({
      message: "success",
      result:tasksAndUsers
    });
  };   


//===================== get all tasks with one user =====================//

export const getTaskWithOneUser = async (req, res, next) => {
    const { _id } = req.authUser;
    const tasksAndUsers = await Task.find({userID:_id}).populate([{path:'userID'},{path:'assignTo'}])
    // success
    res.status(200).json({
      message: "success",
      result:tasksAndUsers
    });
  };     


 //===================== tasks not done =====================//

export const tasksNotDone = async (req, res, next) => {
    const time = new Date()
    const tasks = await Task.find({ deadline: { $lt: time },status:{$ne:"done"}})
    // success
    res.status(200).json({
      message: "success",
      result:tasks
    });
  };      
 
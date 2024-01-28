import { Schema, model } from "mongoose";


const teskSchma = new Schema({
    title:{
        type:String,
        required:true,
        trim:true

    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status: {
        type: String,
        default: 'toDo',
        enum: ['toDo', 'doing','done']
    },
    userID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    assignTo:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    deadline:{
        type:Date,
        required:true,
    },
},{
    timestamps:true
})

const Task = model('tesk',teskSchma)

export default Task



import { Schema, model } from "mongoose";


const userSchma = new Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    age:Number,
    gender: {
        type: String,
        default: 'Male',
        enum: ['Female', 'Male']
    },
    phone:String,
    delete:Boolean,
    role:{
        type:String,
        enum:['user','admin','superAdmin'],
        default:'user',
    }
},{
    timestamps:true
})

const User = model('user',userSchma)

export default User




import User from "../../../DB/models/user.model.js"
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'


//===================== sign up =====================//

export const signUp = async(req,res,next)=>{
    const { username,email,password,age,gender,phone } = req.body
    // is email duplicate
    const emailCheck = await User.findOne({email})
    if(emailCheck) return next(new Error("email already exist ",{cause:400}))
    // hash password
    const hashPassword = bcrypt.hashSync(password,+process.env.HASH_PASSWORD)
    // create user
    const createUser = await User.create({username,email,password:hashPassword,age,gender,phone })
    if(createUser) return res.status(201).json({message:"sucess"})
}


//===================== login =====================//

export const logIn = async(req,res,next)=>{
    const { email,password} = req.body
    // is email found
    const emailCheck = await User.findOne({email,delete:{$ne:true}})
    if(!emailCheck) return next(new Error("invalid login ",{cause:404}))
    // is password match
    const isPasswordMatched = bcrypt.compareSync(password,emailCheck.password)
    if(!isPasswordMatched) return next(new Error("invalid login ",{cause:400})) 
    // create token
    const token = jwt.sign({id:emailCheck._id,email},process.env.ACCESS_TOKEN)
    // sucess
    res.status(200).json({message:"sucess",token})
}


//===================== change password =====================//

export const changePassword = async(req,res)=>{

    const { password } = req.body
    const {_id} = req.authUser
    // hash password
    const hashPassword = bcrypt.hashSync(password,+process.env.HASH_PASSWORD)
    // change password
    await User.updateOne({_id},{password:hashPassword})
    res.status(200).json({message:"sucess"})

}



//===================== updateUser =====================//

export const updateUser = async(req,res)=>{
    const { username,age } = req.body
    const {_id} = req.authUser
    // update
    const userUpdate = await User.updateOne({_id},{username,age})
    // faild
    if(!userUpdate.modifiedCount) return next(new Error('faild update', { cause: 404 })) 
    // sucess
    res.status(200).json({message:"sucess"})
}


//===================== deleteUser =====================//

export const deleteUser = async(req,res)=>{
    const {_id} = req.authUser
    // delete
    const userDelete = await User.deleteOne({_id})
    // faild
    if(!userDelete.deletedCount) return next(new Error('faild delete', { cause: 400 }))  
    // sucess
    res.status(200).json({message:"sucess"})
}


//===================== deleteUser =====================//

export const softDelete = async(req,res)=>{
    const {_id} = req.authUser
    // delete
    const userDelete = await User.updateOne({_id},{delete:true})
    // faild
    if(!userDelete.modifiedCount) return next(new Error('faild delete', { cause: 400 }))  
    // sucess
    res.status(200).json({message:"sucess"})
}


//===================== get all users for admin =====================//

export const getUser = async(req,res)=>{

    const users = await User.find({delete:{$ne:true}})
    // faild
    if(!users.length) return  res.status(200).json({message:"is empty"})
    // sucess
    res.status(200).json({message:"sucess",users})
}


//===================== update from user to admin =====================//

export const createAdmin = async(req,res)=>{
    const {_id} = req.body
    // find user
    const user = await User.findById(_id)
    // not found user
    if(!user) return  res.status(404).json({message:"user not found"})
    // update
    const updateUser = await User.updateOne({_id},{role:"admin"})
    // faild
    if(!updateUser.modifiedCount) return next(new Error('invalid update',{ cause: 400 }))
    // sucess
    res.status(200).json({message:"sucess"})
}


//===================== profile picture =====================//

export const profile_picture = async (req,res,next)=>{
    res.status(200).json({message:"done",data:req.file})
}
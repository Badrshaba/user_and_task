import jwt from "jsonwebtoken"
import User from "../../DB/models/user.model.js"

export const auth = ()=>{
    return async(req,res,next)=>{
 try {
    const {accesstoken}= req.headers
    if(!accesstoken) return res.status(404).json({message:"please login first"})
    if(!accesstoken.startsWith(process.env.TOKEN_START_WHITH)) return next(new Error("invalid token",{cause:409}))
    const token = accesstoken.split(process.env.TOKEN_START_WHITH)[1]
    const decodedData = jwt.verify(token,process.env.ACCESS_TOKEN)
    if(!decodedData || !decodedData.id) return next(new Error("invalid token payload",{cause:400}))
    // user checked
    const findUser = await User.findById(decodedData.id)
    if(!findUser) return next(new Error("invalid token",{cause:409}))
    if(findUser.delete) return next(new Error("user is deleted",{cause:400}))
    req.authUser = findUser
    next()
 } catch (error) {
    next(new Error("catch error in auth middleware"))
 }
    }
}
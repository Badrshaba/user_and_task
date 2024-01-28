
export const isAdmin = ()=>{
    return async(req,res,next)=>{
        const {role} = req.authUser
        if(role=='user') return next(new Error('you are not admin ' , {cause:400}))
        next()
    }
}
export const isSuperAdmin = ()=>{
    return async(req,res,next)=>{
        const {role} = req.authUser
        if(role!='superAdmin') return next(new Error('you are not superAdmin ' , {cause:400}))
        next()
    }
}
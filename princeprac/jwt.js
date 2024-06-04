import jwt from "jsonwebtoken"

const jwtAuthMiddleware =(req,res,next)=>{
    const authorization=req.headers.authorization
    if(!authorization) {
        return res.status(401).json({error:"Token not found"})
    }

    const token=req.headers.authorization.split(' ')[1]
    const secretkey="12345"
    if(!token){
          return res.status(401).json({error:"Unauthorized"})
    }

    try{
        const decoded=jwt.verify(token,secretkey)
        req.user=decoded
        next()
    }

    catch(error){
        console.log(error)
        return res.status(404).json({error:"Invalid token"})
    }
}

const genToken=(userData)=>{
    const secretkey="12345"
    return jwt.sign(userData,secretkey,{expiresIn:30000})
}

export {jwtAuthMiddleware,genToken};
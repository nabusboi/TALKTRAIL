import jwt from "jsonwebtoken"
import User from '../models/user.models.js'

const protectRoute = async(req,res,next) => {
    try{
        const token  = req.cookies.jwt
        if (!token){
            return res.status(401).json({error: "Unauthorized - No token provided"})
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if (!decoded){
            return res.status(401).json({error: "Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password")
        if (!user){
            return res.status(404).json({error: "User Not Found"})
        }

        req.user = user
        next()
    }catch(error){
        console.log("Error in protect middleware" , error.message)
        res.status(501).json({error : "internal server error"})
    }
}

export default protectRoute
import { Request,Response,NextFunction } from "express";
import{verifyToken}from '../utils/token' ;
import UserModel from "../resources/user/user.model";
import Token from '../utils/interfaces/token.interface'
import jwt,{  verify} from "jsonwebtoken";
import HttpExceptions from "../utils/Exceptions/http.exceptions";
async function autnenticatedMiddleware(
    req:Request,
    res:Response,
    next:NextFunction
):Promise<Response|void>{

const bearer=req.headers.authorization;
if(!bearer ||!bearer.startsWith("Bearer ")){
    return next(new HttpExceptions(401,'unauthorized'))
}else{
    const accessToken= bearer.split("Bearer: ")[1].trim()
    try {
        const payload:Token |jwt.JsonWebTokenError=await verifyToken(accessToken)
        if(payload instanceof jwt.JsonWebTokenError){
            return next(new HttpExceptions(401,'unauthorized'))
        }

        const user=await UserModel.findById(payload.id)
        .select('-password')
        .exec();
        if(!user){
            return next(new HttpExceptions(401,'unauthorized'))
        }
        req.user=user;
        next()
    
    } catch (error:any) {
        next(new HttpExceptions(401,'unauthorized'))
    }
}

}
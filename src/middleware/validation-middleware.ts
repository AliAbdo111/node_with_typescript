import joi from 'joi'
import { Request ,Response ,NextFunction ,RequestHandler } from 'express';

function validationMiddleware(schema:joi.Schema):RequestHandler{
    return async(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<void>=>{
        const validationOption={
            abortErly:false,
            allowUnknown:true,
            stripUnknown:true
        }

        try {
            const value= await schema.validateAsync(
                req.body,
                validationOption
            )
             req.body=value;
             next();
        } catch (e:any) {
            const errors:string[]=[]
            e.details.for((error:joi.ValidationErrorItem)=> {
              errors.push(error.message)
            })
            res.status(500).json({errors:errors})
            
        }
    }
};

export default validationMiddleware;
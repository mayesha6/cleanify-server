import { NextFunction, Response } from "express";
import { AnyZodObject } from "zod";


const zodValidateHandler = (schema: AnyZodObject)=> {
    return async (req:any, res:Response, next:NextFunction)=> {
        try{
            await schema.parseAsync(req.body)
            next()
        } catch(e){
            next(e)
        }
    }
}

export default zodValidateHandler
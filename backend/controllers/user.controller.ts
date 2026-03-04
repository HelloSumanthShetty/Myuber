import { Request,Response,NextFunction } from "express";
import user from "../model/user.model";
import { createUser } from "../services/user.service";
import { validationResult } from "express-validator";

export const registerUser = async(req:Request,res:Response,next :NextFunction) =>{
 try {
    let b = req.body
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    const hashedPass = await user.hashPassword(b.password)
    const compare = await user.comparePassword(b.password)
    createUser({firstName:b.firstName, lastName: b.lastName, email: b.email,password: b.password})
    
    res.status(201).json({success: true})
 } catch (error:any) {
     res.status(500).json({ success: false, error: error.message });
 }
}
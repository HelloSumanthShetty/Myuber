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
    const newUser = await createUser({firstName:b.fullName.firstName, lastName: b.fullName.lastName, email: b.email,password: b.password})
    const token =  newUser.generateAuthToken()
    res.status(201).json({success: true, token: token,user: newUser})
 } catch (error:any) {
     res.status(500).json({ success: false, error: error.message });
 }
}

export const loginUser = async(req:Request,res:Response,next :NextFunction) =>{ 
    try {
        let b = req.body
        const error = validationResult(req)     

        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }       

        const findUser = await user.findOne({email: b.email}).select("+password")
        if(!findUser){
            return res.status(400).json({success: false, error: "Invalid email or password"})
        }           
        const isMatch = await findUser.comparePassword(b.password)
        if(!isMatch){
            return res.status(400).json({success: false, error: "Invalid email or password"})
        }           
        const token = findUser.generateAuthToken()
        res.status(200).json({success: true, token: token,user: findUser})
    } catch (error:any) {
        res.status(500).json({ success: false, error: error.message });
    }       
}
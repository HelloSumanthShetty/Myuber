import mongoose,{ Model, Document } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export interface IUser extends Document {
    fullName: {
        firstName: string;
        lastName?: string;
    };
    email: string;
    password?: string;
    SocketId?: string;
}
const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlenght: [3, "first letter must have 3 character"],
            trim: true
        },
        lastName: {
            type: String,
            minlenght: [3, "first letter must have 3 character"],
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlenght: [6, "please fill the approriate email"],
        trim: true
    }, 
    password: {
        type: String,
        required: true,
        select : false
    
    },
    SocketId:{
        type:String
    }
})
export interface IUserMethods {
    generateAuthToken(): string;
    comparePassword(password: string): Promise<boolean>;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
    hashPassword(password: string): Promise<string>;
   comparePassword(password:string) :Boolean,
   generateAuthToken(password:string): string
}
const jwtcode = process.env.JWT || ""
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id:this._id},jwtcode )
  return token
}
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function (password: string) {
  return await bcrypt.hash(password,10)
}
const user = mongoose.model<IUser,UserModel>("User",userSchema)
export default user
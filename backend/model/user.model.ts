import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            require: true,
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
        require: true,
        unique: true,
        minlenght: [6, "please fill the approriate email"],
        trim: true
    }, 
    password: {
        type: String,
        require: true,
        select : false
    
    },
    SocketId:{
        type:String
    }
})
const jwtcode = process.env.JWT || ""
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id:this.id},jwtcode )
  return token
}
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.hashPassword = async function (password: string) {
  return await bcrypt.hash(password,10)
}
const user = mongoose.model("userSchema",userSchema)
export default user
import express from "express";
import {body} from "express-validator"
const route = express.Router()

route.post("/register",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isLength({min:3}).withMessage("First name in required"),
    body("password").isLength({min:6 }).withMessage("password must be 6 character long")
])

export default route
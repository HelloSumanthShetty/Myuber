import express from "express";
import {body} from "express-validator"
const route = express.Router()
import {registerUser, loginUser} from "../controllers/user.controller" 
route.post("/register", [
    body("email")
        .notEmpty().withMessage("Fill the email")
        .isEmail().withMessage("Invalid Email"),
        
    body("fullName.firstName")
        .notEmpty().withMessage("Fill the firstName")
        .isLength({ min: 3 }).withMessage("First name is required to be at least 3 characters"),
        
    body("password")
        .notEmpty().withMessage("Fill the password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], registerUser);

route.post("/login", [
    body("email")
        .notEmpty().withMessage("Fill the email")
        .isEmail().withMessage("Invalid Email"),
    body("password")
        .notEmpty().withMessage("Fill the password")
], loginUser);

export default route
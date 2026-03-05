import express from "express";
import {body} from "express-validator"
import { authMiddleware  } from "../middleware/auth.middleware";
import {registerUser, loginUser, getProfile, logoutUser} from "../controllers/user.controller" 

const route = express.Router()

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

route.get("/profile",authMiddleware, getProfile);
route.delete("/logout", logoutUser)
export default route
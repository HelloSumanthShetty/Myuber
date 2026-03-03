import express from "express"
import { Request,Response } from "express"
import cors from "cors"
const app = express()

app.use(cors())

app.use("/" ,(req :Request,res :Response ) =>{
    res.json("server is running")
})

export default app
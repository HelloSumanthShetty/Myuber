import express from "express"
import { Request,Response } from "express"
import cors from "cors"
import user from "./routes/user.route"
import morgan from "morgan"
import helmet from "helmet"
const app = express()

app.use(cors())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/", async (req,res)=>res.send("serve is live !!"))
app.use("/api/user",user)

export default app
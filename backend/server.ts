import http from "http"
import app from "./app"
import dotenv from "dotenv"
import connection from "./db/connect.db"
dotenv.config()
const server = http.createServer(app);
const mongURI = process.env.MONGOURI || ""
const port = process.env.PORT || 8081
const start =async() => {
    await connection(mongURI)
server.listen(port, () => 
    console.log("server is running")
) 
}
start()
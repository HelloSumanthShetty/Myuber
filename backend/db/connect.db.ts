import mongoose from "mongoose";

const connection =  async(url : string) => {
      try {
        console.log("connecting")
        mongoose.connect(url)
        console.log("connected")
      } catch (error) {
           console.error("mongodb failed to connect"+error)  
        process.exit(1)
      }
} 

export default connection
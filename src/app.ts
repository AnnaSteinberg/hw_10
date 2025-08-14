
import {launchServer} from "./server.ts";
import * as mongoose from "mongoose";
import {MONGO_URI} from "./config/appConfig.ts";


mongoose. connect(MONGO_URI)
    . then ( () : void => {
        // console.log(mongoose.modelNames());
        console. log ("MongoDB successfully connected")
        launchServer();
    }).catch(()=>{
    console.log("MongoDB connection error")
})








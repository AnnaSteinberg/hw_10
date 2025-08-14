import { launchServer } from "./server.ts";
import * as mongoose from "mongoose";
import { MONGO_URL } from "./config/appConfig.ts";
mongoose.connect(MONGO_URL)
    .then(() => {
    // console.log(mongoose.modelNames());
    console.log("MongoDB successfully connected");
    launchServer();
}).catch(() => {
    console.log("MongoDB connection error");
});

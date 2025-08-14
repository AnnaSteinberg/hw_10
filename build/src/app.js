import { launchServer } from "./server.js";
import * as mongoose from "mongoose";
import { MONGO_URI } from "./config/appConfig.js";
mongoose.connect(MONGO_URI)
    .then(() => {
    // console.log(mongoose.modelNames());
    console.log("MongoDB successfully connected");
    launchServer();
}).catch(() => {
    console.log("MongoDB connection error");
});

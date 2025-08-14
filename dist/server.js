import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config/appConfig.ts";
import morgan from "morgan";
export const launchServer = () => {
    const app = express();
    app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));
    // const logStream = fs.createWriteStream("./src/logs/access.log", { flags: "a" });
    const movieSchema = new mongoose.Schema({}, { strict: false });
    const Movie = mongoose.model('Movie', movieSchema, 'movies');
    //============Middleware===========
    app.use(express.json());
    app.use(morgan("dev"));
    // app.use(morgan('combined', {stream: logStream}));
    app.get('/query1', async (req, res) => {
        const result = await Movie.find({
            $expr: { $lt: ['$imdb.rating', '$tomatoes.viewer.rating'] },
        });
        res.send(result);
    });
};

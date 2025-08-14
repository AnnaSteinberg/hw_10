import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config/appConfig.js";
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
        const result = await Movie.find({ $expr: { $gt: ['$imdb.rating', '$tomatoes.viewer.rating'] } })
            .select('title year -_id');
        res.json(result);
    });
    app.get('/query2', async (req, res) => {
        const result = await Movie.find({ languages: ['Russian'] })
            .select('title year -_id').limit(3);
        res.json(result);
    });
    app.get('/query3', async (req, res) => {
        const result = await Movie.find({
            genres: { $all: ['Action', 'Comedy'] }
        })
            .select('title year -_id');
        res.json(result);
    });
    app.get('/query4', async (req, res) => {
        const result = await Movie.find()
            .sort({ 'awards.wins': -1 })
            .limit(2)
            .select('title awards.wins -_id');
        res.json(result);
    });
    app.get('/query5', async (req, res) => {
        const result = await Movie.aggregate([
            { $match: { year: 2010 } },
            {
                $group: {
                    _id: '$imdb.rating',
                    titles: { $push: '$title' },
                },
            },
            { $sort: { _id: -1 } },
        ]);
        res.json(result);
    });
};

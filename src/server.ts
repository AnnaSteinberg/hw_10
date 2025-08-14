import express from "express";
import {PORT} from "./config/appConfig.ts";
import morgan from "morgan";
import {Movie} from "./model/moviesModel.ts";

export  const launchServer = () => {
    const app = express();

    app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));



//============Middleware===========

    app.use(express.json());
    app.use(morgan("dev"));
// ===========

    app.get('/query1', async (req, res) => {
        const result = await Movie.find(
            {$expr: { $gt: ['$imdb.rating', '$tomatoes.viewer.rating'] }})
            .select('title year -_id').limit(10)
        ;

        res.json(result);
    });

    app.get('/query2', async (req, res) => {
        const result = await Movie.find({ languages: ['Russian'] })
            .select('title year -_id').limit(3);
        res.json(result);
    });

    app.get('/query3', async (req, res) => {
        const result = await Movie.find({
            genres: { $all: ['Action', 'Comedy'] }})
        .select('title year -_id').limit(10);
        res.json(result);
    });


    app.get('/query4', async (req, res) => {
        const result = await Movie.find()
            .sort({ 'awards.wins': -1 })
            .limit(2)
            .select('title awards.wins -_id');
        res.json(result);
    });



}


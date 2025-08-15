var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { PORT } from "./config/appConfig.js";
import morgan from "morgan";
import { Movie } from "./model/moviesModel.js";
export const launchServer = () => {
    const app = express();
    app.listen(PORT, () => console.log(`Server runs at http://localhost:${PORT}`));
    //============Middleware===========
    app.use(express.json());
    app.use(morgan("dev"));
    // ===========
    app.get('/query1', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Movie.find({ $expr: { $lt: ['$imdb.rating', '$tomatoes.viewer.rating'] } })
            .select('title year -_id').limit(10);
        res.json(result);
        // res.type('application/json').json(result);//cw
    }));
    app.get('/query2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Movie.find({ languages: ['Russian'] })
            .select('title year -_id').limit(3);
        res.json(result);
    }));
    app.get('/query3', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Movie.find({
            genres: { $all: ['Action', 'Comedy'] }
        })
            .select('title year -_id').limit(10);
        res.json(result);
    }));
    app.get('/query4', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Movie.find()
            .sort({ 'awards.wins': -1 })
            .limit(2)
            .select('title awards.wins -_id');
        res.json(result);
    }));
    app.get('/query5', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Movie.aggregate([
            { $match: { year: 2010 } },
            { $group: { _id: "$imdb.rating", titles: { $push: "$title" } } },
            { $sort: { _id: -1 } }
        ]);
        res.json(result);
    }));
};

import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({}, { strict: false });
export const Movie = mongoose.model('Movie', movieSchema, 'movies');
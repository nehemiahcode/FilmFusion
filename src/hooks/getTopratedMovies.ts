import React from 'react'
import { tmdb } from './getPopularMovies';

async function getTopratedMovies(page = 1) {
    try {
        const response = await tmdb.get(`/movie/top_rated?language=en-US&page=${page}`);
        return response.data.results
    } catch (error) {
        console.log("Error Fetching", error)
        throw error
    }
}

export default getTopratedMovies

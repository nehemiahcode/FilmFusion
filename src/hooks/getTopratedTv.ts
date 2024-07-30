import React from 'react'
import { tmdb } from './getPopularMovies';

async function getTopratedTv(page = 1) {
    try {
        const response = await tmdb.get(`/tv/top_rated?language=en-US&page=${page}`);
        return response.data.results
    } catch (error) {
        console.log("Error Fetching", error)
        throw error
    }
}

export default getTopratedTv

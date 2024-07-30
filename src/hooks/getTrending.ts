import React from 'react'
import { tmdb } from './getPopularMovies';

async function getTrending(page = 1) {
    try {
        const response = await tmdb.get(`/trending/all/day?language=en-US&page=${page}`);
        return response.data.results
    } catch (error) {
        console.log("Error Fetching", error)
        throw error
    }
}

export default getTrending

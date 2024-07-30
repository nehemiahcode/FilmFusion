import React from 'react'
import {tmdb } from './getPopularMovies';

async function getOnTheAir(page = 1) {
    try {
        const response = await tmdb.get(`/tv/on_the_air?language=en-US&page=${page}`);
        return response.data.results
    } catch (error) {
        console.log("Error Fetching", error)
        throw error
    }
}

export default getOnTheAir

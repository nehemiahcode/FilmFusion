import React from 'react';
import { bearer_token, tmdb } from './getPopularMovies';

async function getUpComingMovies(page = 2, minDateStr = new Date().toDateString()) {
    try {
        const response = await tmdb.get(`movie/upcoming?language=en-US&page=${page}`);
        const minDate = new Date(minDateStr);

        // Filter the results based on the minimum date
        const filteredResults = response.data.results.filter((movie: any) => {
            const releaseDate = new Date(movie.release_date);
            return releaseDate >= minDate;
        });

        return filteredResults;
    } catch (error) {
        console.log("Error Fetching", error);
        throw error;
    }
}

export default getUpComingMovies;


import React from 'react'
import { tmdb } from './getPopularMovies';

async function AiringToday(page = 1) {
    try {
        const response = await tmdb.get(`/tv/airing_today?language=en-US&page=${page}`);
        return response.data.results
    } catch (error) {
        console.log("Error Fetching", error)
        throw error
    }
}

export default AiringToday


export const getTvById = async (id: number) => {
    try {
        const response = await tmdb.get(`/tv/${id}`)
        return response.data
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
}

export const getTvSeasonDetails = async (tvId: number, seasonNumber: number) => {
    const response = await tmdb.get(`/tv/${tvId}/season/${seasonNumber}`);
    return response.data;
};

export const getEpisodeDetails = async (tvId: string, seasonNumber: string, episodeNumber: string) => {
    const response = await tmdb.get(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`);
    return response.data;
};

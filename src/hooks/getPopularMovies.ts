// hooks/getMovies.ts
import axios from "axios";

const api_key = process.env.TMDB_API_KEY;
const base_url = process.env.NEXT_TMDB_BASE_URL;
export const bearer_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2MyY2ViYzAxMTc5MWE0NjNhNmEzZDc4MGY4NDQwZSIsIm5iZiI6MTcyMjQ4NjcyNS4zOTQ1ODIsInN1YiI6IjY2YWIwZWU3NzhlNDg2MzRkNWNkNWE4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CqdNl7Lya8h0juW6FkTIQfQuBA8kMrJp8MrdqYG3A0o'

export const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${bearer_token}`,
        Accept:"application/json"
    },
    params: {
        api_key: 'f7c2cebc011791a463a6a3d780f8440e',

    },
});

export const getAllPopularMovies = async (page = 1) => {
    try {
        const response = await tmdb.get(`/movie/popular?language=en-US&page=` + page);
        return response.data.results; 
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
}

export const getAllPopularMoviesById = async (id: number) => {
    try {
        const response = await tmdb.get(`/movie/${id}`)
        return response.data
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
}

export const getAllTvById = async (id: number) => {
    try {
        const response = await tmdb.get(`/tv/${id}`)
        return response.data
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
}

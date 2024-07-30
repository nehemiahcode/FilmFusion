// hooks/getMovies.ts
import axios from "axios";

const api_key = process.env.TMDB_API_KEY;
const base_url = process.env.NEXT_TMDB_BASE_URL;
export const bearer_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjU5MTc1NWVhZDIxMzMzMzQwZjA2NTM5ZGRhYzRmOSIsIm5iZiI6MTcyMTg2NDY4Ni4yNzA5NjMsInN1YiI6IjY2YTE5MDA4MjljOTM4ODdiMDUyOWRhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ajfk3v3QLhnzaI6wdgV1eMLVPxb1BDZLOxQtiNkwzM0'

export const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${bearer_token}`,
        Accept:"application/json"
    },
    params: {
        api_key: '62591755ead21333340f06539ddac4f9',

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

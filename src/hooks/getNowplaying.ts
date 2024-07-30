import {  tmdb } from './getPopularMovies';



async function getNowplaying(page = 1) {
    try {
        const response = await tmdb.get(`/movie/now_playing?language=en-US&page=${page}`);
        return response.data.results
    } catch (error) {
        console.log("Error Fetching", error)
        throw error
    }
}

export default getNowplaying

import { tmdb } from "./getPopularMovies";

// Function to search movies or TV shows based on the provided query and type
export const searchMovies = async (query: string) => {
  try {
    const response = await tmdb.get(`/search/multi?include_adult=false&language=en-US&page=1&query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};



import axios from 'axios';

const baseUrl = 'https://www.omdbapi.com/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

const api_key = "5a5c4e58";

export const getMovies = async (query, page) => {
    try {
        const response = await 
            axiosInstance.get(`?s=${query}&page=${page}&apikey=${api_key}`)
        return response.data.Search
    }
    catch (error) {
        console.log(error)
    }
}

export const getMovieDetails = async (id) => {
    try {
        const response = await
        axiosInstance.get(`?i=${id}&apikey=${api_key}`);
        return response.data
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};

export const getEpisodes = async (query, season) => {
    try {
        const response = await
            axiosInstance.get(`?t=${query}&Season=${season}&apikey=${api_key}`);
        return response.data
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}
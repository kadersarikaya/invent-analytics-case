import axios from 'axios';

const baseUrl = 'https://www.omdbapi.com/'

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

const api_key = "5a5c4e58";

export const getFirstRenderedMovies = async () => {
    try {
        const response = await 
            axiosInstance.get(`?s=Pokemon&page=1&apikey=${api_key}`)
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
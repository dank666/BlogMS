import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const getPosts = async () => {
    return axios.get(`${API_URL}/posts/`);
};

export const createPost = async (postData) => {
    return axios.post(`${API_URL}/posts/`, postData);
};


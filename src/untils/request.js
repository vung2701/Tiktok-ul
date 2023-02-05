import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => {
    const responses = await request.get(path, options);
    return responses.data;
};

export default request;

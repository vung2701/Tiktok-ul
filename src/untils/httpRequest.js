import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const responses = await httpRequest.get(path, options);
    return responses.data;
};

export default httpRequest;

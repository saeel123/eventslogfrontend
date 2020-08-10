import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fathomless-lake-34348.herokuapp.com/'
});

export default instance;
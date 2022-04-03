import axios from 'axios';

const instance = axios.create({ baseURL: "http://localhost:3001" }); //process.env.REACT_APP_BASE_URL
const hospitalApi = axios.create({ baseURL: "https://dekontaminasi.com" }); //process.env.HOPITAL_API

export default instance;
const axios = require('axios');

const hospitalApi = axios.create({ baseURL: process.env.HOSPITAL_URL }); //https://dekontaminasi.com

module.exports = {
  hospitalApi
};
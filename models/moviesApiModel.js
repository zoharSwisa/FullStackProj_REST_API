const axios = require('axios');

const url = 'https://api.tvmaze.com/shows';

exports.getAllMovies = function()
{
    return axios.get(url);
}
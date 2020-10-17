const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

exports.getAllMembers = function()
{
    return axios.get(url);
}
const service = require('./services/service');
var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser');

require('./configs/database');

app.use(bodyParser.urlencoded({ extended: true }))  
   .use(bodyParser.json());

app.use('/api/movies', require('./routes/moviesRoute'));
app.use('/api/members', require('./routes/membersRoute'));
app.use('/api/subscriptions', require('./routes/subscriptionsRoute'));


app.listen(8000, () => {
   service.SaveAllMoviesFromWS();
   service.SaveAllMembersFromWS();
});
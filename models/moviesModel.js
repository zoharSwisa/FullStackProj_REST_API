const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    Name : String,
    Genres : [{
        type : String
    }],
    Image : String,
    Premiered: Date
});

module.exports = mongoose.model('Movies',MovieSchema);

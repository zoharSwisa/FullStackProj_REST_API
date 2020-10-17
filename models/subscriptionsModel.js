const mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var SubscriptionSchema = new Schema({
    MemberId : ObjectId,
    Movies : [{
        movieId : ObjectId,
        date: Date
    }]
});

module.exports = mongoose.model('subscriptions',SubscriptionSchema);






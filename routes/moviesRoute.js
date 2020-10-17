const express = require('express');
const router = express.Router();
const Movie = require('../models/moviesModel')

router.route('/').get(function(req,resp)
{
    Movie.find({}, function(err,movies)
    {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }
        return resp.json({
            "isSuccessful" : true,
            "movies" : movies});
    });      
});

router.route('/').post(function(req,resp)
{
    const m = new Movie({
        Name : req.body.name,
        Genres : req.body.genres,
        Image: req.body.image,
        Premiered: req.body.premiered
    });

    m.save(function(err) {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }
        let movie = {
            "id":m._id,
            "name" : req.body.name,
            "genres" : req.body.genres,
            "image": req.body.image,
            "premiered": req.body.premiered
        };

        return resp.json({
            "isSuccessful" : true,
            "movie":movie
        });
    });      
});

router.route('/:id').get(function(req,resp)
{
    Movie.findById(req.params.id, function(err,movie)
    {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }
        return resp.json({
            "isSuccessful" : true,
            "movie" : movie});
    });
});

router.route('/:id').put(function(req,resp)
{
    Movie.findByIdAndUpdate(req.params.id,
    {
        Name : req.body.name,
        Genres : req.body.genres,
        Image: req.body.image,
        Premiered: req.body.premiered
    }, function(err)
    {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }
        else
        {
            let movie = {
                "id":req.params.id,
                "name" : req.body.name,
                "genres" : req.body.genres,
                "image": req.body.image,
                "premiered": req.body.premiered
            };
            return resp.json({
                "isSuccessful" : true,
                "movie":movie
            });
        }
    });
    
});

router.route('/:id').delete(function(req,resp)
{
    Movie.findByIdAndDelete(req.params.id,function(err)
    {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }
        else
        {
            return resp.json({
                "isSuccessful" : true});
        }
    });
});

module.exports = router; 
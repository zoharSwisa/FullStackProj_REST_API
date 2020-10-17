const express = require('express');
const router = express.Router();
const Subscription = require('../models/subscriptionsModel');

router.route('/').get(function(req,resp)
{
    Subscription.find({}, function(err,subs)
    {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }
        
        return resp.json({
            "isSuccessful" : true,
            "res" : subs});
    });
});

router.route('/').post(function(req,resp)
{
    const s = new Subscription({
        MemberId : req.body.memberId,
        Movies : req.body.movies
    });

    s.save(function(err) {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }

        return resp.json({
            "isSuccessful" : true});
    });      
});

router.route('/:id').get(function(req,resp)
{
    Subscription.findById(req.params.id, function(err,sub)
    {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }
        return resp.json({
            "isSuccessful" : true,
            "res" : sub});
    });
});

router.route('/:id').put(function(req,resp)
{
    Subscription.findByIdAndUpdate(req.params.id,
    {
        MemberId : req.body.memberId,
        Movies : req.body.movies
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
            return resp.json({
                "isSuccessful" : true});
        }
    });
});

router.route('/:id').delete(function(req,resp)
{
    Subscription.findByIdAndDelete(req.params.id,function(err)
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
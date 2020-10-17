const express = require('express');
const router = express.Router();
const Member = require('../models/membersModel')

router.route('/').get(function(req,resp)
{
    Member.find({}, function(err,mems)
    {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }
        
        return resp.json({
            "isSuccessful" : true,
            "res" : mems});
    });    
});

router.route('/').post(function(req,resp)
{
    const m = new Member({
        Name : req.body.name,
        Email : req.body.email,
        City : req.body.city
    });

    m.save(function(err) {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }

        return resp.json({
            "isSuccessful" : true,
            "member" : {
                "id":m._id,
                "name":req.body.name,
                "email":req.body.email,
                "city":req.body.city
            }
        });
    });      
});

router.route('/:id').get(function(req,resp)
{
    Member.findById(req.params.id, function(err,mem)
    {
        if(err)
        {
            return resp.json({
                "isSuccessful" : false,
                "err" : err});
        }
        return resp.json({
            "isSuccessful" : true,
            "res" : mem});
    });
});

router.route('/:id').put(function(req,resp)
{
    Member.findByIdAndUpdate(req.params.id,
    {
        Name : req.body.name,
        Email : req.body.email,
        City: req.body.city
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
    Member.findByIdAndDelete(req.params.id,function(err)
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
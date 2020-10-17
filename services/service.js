const apiMoviesDal = require('../models/moviesApiModel');
const apiMembersDal = require('../models/membersApiModel');
const express = require('express');
const Movie = require('../models/moviesModel');
const Member = require('../models/membersModel');


exports.SaveAllMoviesFromWS = async () => {
    Movie.find({}, async function(err,movies)
    {
        if(!err)
        {
            if (!movies || movies.length == 0)
            {
                let moviesFromWS = await apiMoviesDal.getAllMovies();
                if (moviesFromWS && moviesFromWS.data) {
                    moviesFromWS.data.forEach(m => {
                        let movie = new Movie({
                            Name : m.name,
                            Genres : m.genres,
                            Image : m.image.medium,
                            Premiered : new Date(m.premiered)
                        });

                        movie.save(function(err) {
                            if(err)
                            {
                                console.log("ERROR 'SaveAllMoviesFromWS': MovieName: " + m.name + " Err: " + err);
                            }
                        });  
                    });     
                }
            }
        }
    }); 
}

exports.SaveAllMembersFromWS = async () => {
    Member.find({}, async function(err,mems)
    {
        if(!err)
        {
            if (!mems || mems.length == 0)
            {
                let memberFromWS = await apiMembersDal.getAllMembers();

                if (memberFromWS && memberFromWS.data) {
                    memberFromWS.data.forEach(m => {
                        let member = new Member({
                            Name : m.name,
                            Email : m.email,
                            City : m.address.city
                        });

                        member.save(function(err) {
                            if(err)
                            {
                                console.log("ERROR 'SaveAllMembersFromWS': MemberName: " + m.name + " Err: " + err);
                            }
                        });  
                    });     
                }
            }
        }
    }); 
}
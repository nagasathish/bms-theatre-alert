var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
var request = require('request')
var url = require('url');

// BMS Movie URL
var bmsMoviePage = 'https://in.bookmyshow.com/buytickets/bharat-ane-nenu-hyderabad/movie-hyd-ET00059033-MT/20180420#!seatlayout';

/* GET users listing. */
router.get('/', function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342'); //Change to your origin URL

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    request({uri: bmsMoviePage}, function(err, response, body){
        var self = this;
        self.items = new Array();//I feel like I want to save my results in an array

        //Just a basic error check
        if(err && response.statusCode !== 200){console.log('Request error.');}
        //Send the body param as the HTML code we will parse in jsdom
        //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
        console.log(response);

        res.send(response);
    });
});







module.exports = router;

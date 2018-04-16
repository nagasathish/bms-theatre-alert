var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');
var request = require('request')
var url = require('url');
var path = require('path');


/* GET users listing. */
router.get('/', function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.sendFile(path.join(__dirname, '../public', '/html/dashboard.html'));
});


module.exports = router;

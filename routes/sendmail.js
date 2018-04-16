var express = require('express');
var router = express.Router();
var request = require('request')
var url = require('url');
var nodemailer = require('nodemailer');

const USERNAME = 'YOUR_EMAIL';
const PASSWORD = 'PASSWORD';
const TO_EMAIL = 'TO_EMAIL';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USERNAME,
        pass: PASSWORD
    }
});

const mailOptions = {
    from: USERNAME, // sender address
    to: TO_EMAIL, // list of receivers
    subject: 'New Theatre added alert - NODE ALERT', // Subject line
    html: '<p>New Theatre added alert - NODE ALERT</p>'// plain text body
};

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

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    });

    res.send("MAIL SENT!")
});







module.exports = router;

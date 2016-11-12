/**
*@author :: Jyotirmay
*@Date :: 11th November 2016
*/

var express = require('express');
var userService = require("../services/NodeTKService")
var router = express.Router();

console.log("in NodeTKRoute");

router.post('/', function (req, res) {
    var userData = req.body;
    userService.save(userData, function (err, data) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.send(data);
            return;
        }
    });
});

module.exports = router;





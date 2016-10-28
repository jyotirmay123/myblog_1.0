/**
*@author :: Jyotirmay
*@Date :: 28th Oct, 2016
*/

var express = require('express');
var userService = require("../services/NodeUserService")
var router = express.Router();

console.log("in NodeUserRoute");

router.get('/', function (req, res) {
    userService.getAll(function (err, data) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.send(data);
            return;
        }
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    userService.getById(id, function (err, data) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.send(data);
            return;
        }
    });
});

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

router.put('/', function (req, res) {
    var userData = req.body;
    userService.edit(userData, function (err, data) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.send(data);
            return;
        }
    });
});

router.delete('/:id', function (req, res) {
    var id = req.params.id;
    userService.delete(id, function (err, data) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.send(data);
            return;
        }
    });
});

router.delete('/', function (req, res) {
    userService.deleteAll(function (err, data) {
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
/**
*@author :: Jyotirmay
*@Date :: 28th Oct, 2016
*/

var express = require('express');
var loginService = require("../services/NodeLoginService")
var router = express.Router();

console.log("in NodeLoginRoute");

router.get('/', function (req, res) {
    loginService.getAll(function (err, data) {
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
    loginService.getById(id, function (err, data) {
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
    var sessionData = req.body;
    loginService.save(sessionData, function (err, data) {
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
    loginService.delete(id, function (err, data) {
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
    loginService.deleteAll(function (err, data) {
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
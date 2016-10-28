/**
*@author :: Jyotirmay
*@Date :: 01st Oct, 2016
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ hello: "hi" });
});

module.exports = router;
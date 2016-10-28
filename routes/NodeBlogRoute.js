/**
*@author :: Jyotirmay
*@Date :: 03rd Oct, 2016
*/

var express = require('express');
var blogService = require("../services/NodeBlogService")
var router = express.Router();

console.log("in NodeBlogRoute");

router.get('/', function (req, res) {
  blogService.getAll(function (err, data) {
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
  blogService.getById(id, function (err, data) {
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
  var blogData = req.body;
  blogService.save(blogData, function (err, data) {
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
  var blogData = req.body;
  blogService.edit(blogData, function (err, data) {
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
  blogService.delete(id, function (err, data) {
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
  blogService.deleteAll(function (err, data) {
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
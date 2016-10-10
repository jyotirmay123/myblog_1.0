var express = require('express');
var blogService = require("../services/NodeBlogService")
var router = express.Router();

console.log("in NodeBlogRoute");
/* GET home page. */
router.get('/', function(req, res) {
  blogService.getAll(function(err, data){
    if(err) {
        res.send(err);
        return;
    } else {
        res.send(data);
        return;
    }
  });
});

router.post('/', function(req, res) {
  var blogData = req.body;
  blogService.save(blogData, function(err, data){
    if(err) {
        res.send(err);
           return;
    } else {
    res.send(data);
       return;
    }
  });
});

module.exports = router;
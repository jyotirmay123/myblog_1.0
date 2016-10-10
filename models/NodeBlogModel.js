/**
*@author :: Jyotirmay
*@Date :: 03rd Oct, 2016
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var autoIncrement = require('mongoose-auto-increment');
//var connection = mongoose.createConnection("mongodb://localhost/AssociatePortal");

console.log('in blogModel');

//var connection = mongoose.createConnection('mongodb://admin:D9iULILnQZmb@127.2.41.130:27017/associateportal');
//autoIncrement.initialize(connection);
var blogSchema = new Schema(
	{
		blogId:{type:Number, required:true},
		blogger:{type:String, required:true},
		blogcontent:{type:String, required:true},
		createdDate:{type:Date,'default':Date.now},
		modifiedDate:{type:Date,'default':Date.now},
	},{ versionKey: false });

//blogSchema.plugin(autoIncrement.plugin, 'blogSchema');

exports.blogModel = mongoose.model('blogModel',blogSchema);

/*
{
    "blogId":1,
    "blogger": "JMS",
    "blogcontent": "pata ni"
}*/

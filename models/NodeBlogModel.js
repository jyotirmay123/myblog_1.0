/**
*@author :: Jyotirmay
*@Date :: 03rd Oct, 2016
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoincrement = require('mongoose-autoincrement');

mongoose.plugin(autoincrement);

console.log('in blogModel');

var blogSchema = new Schema(
	{
		blogger: { type: String, required: true },
		blogcontent: { type: String, required: true },
		createdDate: { type: Date, 'default': Date.now },
		modifiedDate: { type: Date, 'default': Date.now },
	}, { versionKey: false });

exports.blogModel = mongoose.model('blogModel', blogSchema);

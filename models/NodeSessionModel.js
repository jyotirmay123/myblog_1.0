/**
*@author :: Jyotirmay
*@Date :: 28th Oct, 2016
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoincrement = require('mongoose-autoincrement');

mongoose.plugin(autoincrement);

console.log('in sessionModel');

var sessionSchema = new Schema(
	{
		blogger: { type: String, required: true },
		blogcontent: { type: String, required: true },
		createdDate: { type: Date, 'default': Date.now },
		modifiedDate: { type: Date, 'default': Date.now },
	}, { versionKey: false });

exports.sessionModel = mongoose.model('sessionModel', sessionSchema);

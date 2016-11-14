/**
*@author :: Jyotirmay
*@Date :: 11th November 2016
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoincrement = require('mongoose-autoincrement');

mongoose.plugin(autoincrement);

console.log('in TKModel');

var TKSchema = new Schema(
	{
		geobytescapital: { type: String },
		geobytescertainty: { type: String },
		geobytescity: { type: String },
		geobytescityid: { type: String },
		geobytescode: { type: String },
		geobytescountry: { type: String },
		geobytescurrency: { type: String },
		geobytescurrencycode: { type: String },
		geobytesdma: { type: String },
		geobytesforwarderfor: { type: String },
		geobytesfqcn: { type: String },
		geobytesinternet: { type: String },
		geobytesipaddress: { type: String },
		geobyteslocationcode: { type: String },
		geobyteslatitude: { type: String },
		geobyteslongitude: { type: String },
		geobytesmapreference: { type: String },
		geobytesnationalityplural: { type: String },
		geobytesnationalitysingular: { type: String },
		geobytespopulation: { type: String },
		geobytesregion: { type: String },
		geobytesregionlocationcode: { type: String },
		geobytestimezone: { type: String },
		geobytestitle: { type: String },
		geobytesremoteip: { type: String },
		client: { type: String },
		referrer: { type: String },
		createdDate: { type: Date, 'default': Date.now }
	}, { versionKey: false });

exports.TKModel = mongoose.model('TKModel', TKSchema);

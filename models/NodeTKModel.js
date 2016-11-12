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
		createdDate: { type: Date, 'default': Date.now }
	}, { versionKey: false });

exports.TKModel = mongoose.model('TKModel', TKSchema);


/*{"geobytescapital":"New Delhi",
"geobytescertainty":"73",
"geobytescity":"Bangalore",
"geobytescityid":"4058",
"geobytescode":"KA",
"geobytescountry":"India",
"geobytescurrency":"Indian Rupee ",
"geobytescurrencycode":"INR",
"geobytesdma":"0",
"geobytesforwarderfor":"",
"geobytesfqcn":"Bangalore, KA, India",
"geobytesinternet":"IN",
"geobytesipaddress":"106.51.141.204",
"geobyteslatitude":"12.983000",
"geobyteslocationcode":"INKABANG",
"geobyteslongitude":"77.583000",
"geobytesmapreference":"Asia ",
"geobytesnationalityplural":"Indians",
"geobytesnationalitysingular":"Indian",
"geobytespopulation":"1029991145",
"geobytesregion":"Karnataka",
"geobytesregionlocationcode":"INKA",
"geobytesremoteip":"106.51.141.204",
"geobytestimezone":"+05:30",
"geobytestitle":"India"}*/
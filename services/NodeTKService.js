/**
*@author :: Jyotirmay
*@Date :: 11th November 2016
*/

var TkModel = require('../models/NodeTKModel').TKModel;
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

console.log('in NodeTKService');

var NodeTKService = {
	// Save to userSchema
	save: function (viewerInfo, next) {
		this.notify(viewerInfo);
		var tkModel = new TkModel(viewerInfo);
		tkModel.save(function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: "User TK Info Saved Successfully", ViewerId: tkModel._id })
			}
		});
	},
	notify: function (viewerInfo) {
		var mailID = 'senapati.jyotirmay%40gmail.com';
		var privateAppPassCode = 'ppmiskiiwfcvtiob';
		
		var transporter = nodemailer.createTransport(
			smtpTransport('smtps://'+mailID+':'+privateAppPassCode+'@smtp.gmail.com')
		);
		// setup e-mail data with unicode symbols
		var mailOptions = {
			from: '"Jyotirmay" <senapati.jyotirmay@gmail.com>', // sender address
			to: 'senapati.jyotirmay@gmail.com',
			subject: 'BlogApp: Someone is viewing your app', // Subject line
			text: 'Hello world ?', // plaintext body
			html: `
			    Below are the details of the viewer::
				<br> 
				<ul>
				<li>
				`+
				`geobytesforwarderfor:`+viewerInfo.geobytesforwarderfor+
				`</li><li>geobytesremoteip:`+viewerInfo.geobytesremoteip+
				`</li><li>geobytesipaddress:`+viewerInfo.geobytesipaddress+
				`</li><li>geobytescertainty:`+viewerInfo.geobytescertainty+
				`</li><li>geobytesinternet:`+viewerInfo.geobytesinternet+
				`</li><li>geobytescountry:`+viewerInfo.geobytescountry+
				`</li><li>geobytesregionlocationcode:`+viewerInfo.geobytesregionlocationcode+
				`</li><li>geobytesregion:`+viewerInfo.geobytesregion+
				`</li><li>geobytescode:`+viewerInfo.geobytescode+
				`</li><li>geobyteslocationcode:`+viewerInfo.geobyteslocationcode+
				`</li><li>geobytesdma:`+viewerInfo.geobytesdma+
				`</li><li>geobytescity:`+viewerInfo.geobytescity+
				`</li><li>geobytescityid:`+viewerInfo.geobytescityid+
				`</li><li>geobytesfqcn:`+viewerInfo.geobytesfqcn+
				`</li><li>geobyteslatitude:`+viewerInfo.geobyteslatitude+
				`</li><li>geobyteslongitude:`+viewerInfo.geobyteslongitude+
				`</li><li>geobytescapital:`+viewerInfo.geobytescapital+
				`</li><li>geobytestimezone:`+viewerInfo.geobytestimezone+
				`</li><li>geobytesnationalitysingular:`+viewerInfo.geobytesnationalitysingular+
				`</li><li>geobytespopulation:`+viewerInfo.geobytespopulation+
				`</li><li>geobytesnationalityplural:`+viewerInfo.geobytesnationalityplural+
				`</li><li>geobytesmapreference:`+viewerInfo.geobytesmapreference +
				`</li><li>geobytescurrency:`+viewerInfo.geobytescurrency+
				`</li><li>geobytescurrencycode:`+viewerInfo.geobytescurrencycode+
				`</li><li>client:`+viewerInfo.client+
				`</li><li>referrer:`+viewerInfo.referrer+
				`</li><li>geobytestitle:`+viewerInfo.geobytestitle+`
				</li>
				</ul>
				` // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Message sent: ' + info.response);
			}
		});
		return;
	}
}

module.exports = NodeTKService;
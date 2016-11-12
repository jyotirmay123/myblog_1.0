/**
*@author :: Jyotirmay
*@Date :: 11th November 2016
*/

var TkModel = require('../models/NodeTKModel').TKModel;

console.log('in NodeTKService');

var NodeTKService = {
	// Save to userSchema
	save: function (userInfo, next) {
		var tkModel = new TkModel(userInfo);
		tkModel.save(function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: "User TK Info Saved Successfully", userAppId: tkModel._id })
			}
		});
	},
}

module.exports = NodeTKService;
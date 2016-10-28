/**
*@author :: Jyotirmay
*@Date :: 28th Oct, 2016
*/

var UserModel = require('../models/NodeUserModel').userModel;

console.log('in NodeUserService');

var NodeUserService = {
	// Save to userSchema
	save: function (userInfo, next) {
		var userModel = new UserModel(userInfo);
		userModel.save(function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: "User Info Saved Successfully", userAppId: userModel._id })
			}
		});
	},

	// Get all users detail saved in userSchema
	getAll: function (next) {
		var query = UserModel.find().sort({ "_id": 1 });
		query.exec(function (err, userInfos) {
			if (err) {
				next(err);
			}
			else if (userInfos.length != 0) {
				next(null, userInfos);
			}
			else {
				next({ message: 'No User info Found' });
			}
		});
	},

	// Get one userInfo with matched ID from userSchema
	getById: function (id, next) {
		var query = UserModel.findOne({
			"_id": id
		});
		query.exec(function (err, userInfo) {
			if (err) {
				next(err);
			}
			else if (userInfo) {
				next(null, userInfo);
			}
			else {
				next({ message: 'No user info found with userAppId: ' + id });
			}
		});
	},

	// Update and save the userInfo with ID provided into the userSchema
	edit: function (userInfo, next) {
		var id = userInfo._id;
		if (typeof id == 'undefined') {
			next({ error: 'UserAppId Not Found.' });
			return;
		}
		UserModel.update({ "_id": id }, userInfo, {}, function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: 'User with AppId:' + id + ' Updated' });
			}
		});
	},

	// Delete an UserInfo with matched APP_ID from userSchema
	delete: function (id, next) {
		UserModel.remove({ "_id": id }, function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: 'UserInfo with AppId:' + id + ' Deleted' });
			}
		});
	},

	// delete all blogs from blogSchema
	deleteAll: function (next) {
		UserModel.remove({}, function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: 'All User Infos Deleted' });
			}
		});
	}
}

module.exports = NodeUserService;
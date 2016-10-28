/**
*@author :: Jyotirmay
*@Date :: 28th Oct, 2016
*/

var SessionModel = require('../models/NodeBlogModel').sessionSchema;

console.log('in NodeBlogService');

var NodeLoginService = {
	// Save to sessionSchema
	save: function (session, next) {
		var sessionModel = new SessionModel(session);
		sessionModel.save(function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: "Session Saved Successfully", sessionId: sessionModel._id })
			}
		});
	},

	// Get all sessions saved in sessionSchema
	getAll: function (next) {
		console.log("Get ALl coming service")
		var query = SessionModel.find().sort({ "_id": 1 });
		query.exec(function (err, sessions) {
			if (err) {
				next(err);
			}
			else if (sessions.length != 0) {
				next(null, sessions);
			}
			else {
				next({ message: 'No Session Found' });
			}
		});
	},

	// Get one session with matched ID from sessionSchema
	getById: function (id, next) {
		var query = SessionModel.findOne({
			"_id": id
		});
		query.exec(function (err, session) {
			if (err) {
				next(err);
			}
			else if (session) {
				next(null, session);
			}
			else {
				next({ message: 'No session found with sessionId: ' + id });
			}
		});
	},

	// Update and save the session with ID provided into the sessionSchema
	edit: function (session, next) {
		var id = session._id;
		if (typeof id == 'undefined') {
			next({ error: 'sessionId Not Found.' });
			return;
		}
		SessionModel.update({ "_id": id }, session, {}, function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: 'session with id:' + id + ' Updated' });
			}
		});
	},

	// Delete a session with matched ID from sessionSchema
	delete: function (id, next) {
		SessionModel.remove({ "_id": id }, function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: 'session with id:' + id + ' Deleted' });
			}
		});
	},

	// delete all sessions from sessionSchema
	deleteAll: function (next) {
		SessionModel.remove({}, function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: 'All Sessions Deleted' });
			}
		});
	}
}

module.exports = NodeLoginService;
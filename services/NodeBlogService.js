/**
*@author :: Jyotirmay
*@Date :: 01st Oct, 2016
*/

var BlogModel = require('../models/NodeBlogModel').blogModel;

console.log('in NodeBlogService');

var NodeBlogService = {
	// Save to blogSchema
	save: function (blogDetails, next) {
		var blogModel = new BlogModel(blogDetails);
		blogModel.save(function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: "Blog Saved Successfully", blogId: blogModel._id })
			}
		});
	},

	// Get all blogs saved in blogSchema
	getAll: function (next) {
		console.log("Get ALl coming service")
		var query = BlogModel.find().sort({ "_id": 1 });
		query.exec(function (err, blogs) {
			if (err) {
				next(err);
			}
			else if (blogs.length != 0) {
				next(null, blogs);
			}
			else {
				next({ message: 'No Blogs Found' });
			}
		});
	},

	// Get one blog with matched ID from blogSchema
	getById: function (id, next) {
		var query = BlogModel.findOne({
			"_id": id
		});
		query.exec(function (err, blog) {
			if (err) {
				next(err);
			}
			else if (blog) {
				next(null, blog);
			}
			else {
				next({ message: 'No blog Found with blogId: ' + id });
			}
		});
	},

	// Update and save the blog with ID provided into the blogSchema
	edit: function (blogDetails, next) {
		var id = blogDetails._id;
		if (typeof id == 'undefined') {
			next({ error: 'blogId Not Found.' });
			return;
		}
		BlogModel.update({ "_id": id }, blogDetails, {}, function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: 'blog with id:' + id + ' Updated' });
			}
		});
	},

	// Delete a blog with matched ID from blogSchema
	delete: function (id, next) {
		BlogModel.remove({ "_id": id }, function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: 'blog with id:' + id + ' Deleted' });
			}
		});
	},

	// delete all blogs from blogSchema
	deleteAll: function (next) {
		BlogModel.remove({}, function (err) {
			if (err) {
				next(err);
			} else {
				next(null, { message: 'All blogs Deleted' });
			}
		});
	}
}

module.exports = NodeBlogService;
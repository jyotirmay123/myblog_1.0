/**
*@author :: Jyotirmay
*@Date :: 01st Oct, 2016
*/

	var BlogModel = require('../models/NodeBlogModel').blogModel;
	
	console.log('in NodeBlogService');

	var NodeBlogService = {
		save : function(blogDetails,next) {
			var blogModel = new BlogModel(blogDetails, {_id:false});  
			blogModel.save(function(err) {
				if (err) {
					next(err);
				} else {
					next(null);
				}
			});
		},

		getAll : function(next) {console.log("Get ALl coming service")
			var query = BlogModel.find().sort({"blogId":1});
			query.exec(function(err, blogs) {
				if (err){
					next(err);
				}
				else if(blogs.length!=0){
					next(null,blogs);
				}
				else{
					next('No Blogs Found');
				}
			});
		},
		
		getById : function(id,next) {
			var query = BlogModel.findOne({
				"blogId" : id
			});
			query.exec(function(err, blog) {
				if (err){
					next(err);
				}
				else if(blog){
					next(null,blog);
				}
				else{
					next('No blog Found with blogId: ' + id);
				}
			});
		},
		
		edit : function(blogDetails,next) {
			var id = blogDetails.blogId;
			if (typeof id == 'undefined') {
				next('Error: blogId Not Found.');
			}
			//delete assetDetails.assetId;
			BlogModel.update({"blogId":id},blogDetails,{},function(err) {
				if (err) {
					next(err);
				} else {
					next(null);
				}
			});
		},

		delete : function(id,next) {
			BlogModel.remove({"assetId" : id},function(err) {
				if (err) {
					next(err);
				} else{
					next(null,'Asset Deleted');
				}
			});
		}	
	}

	module.exports = NodeBlogService;
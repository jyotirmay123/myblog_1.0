var config = {};

config.mongoUri = 'mongodb://localhost:27017/myblogDB';
//config.mongoUri = "mongodb://devadmin:devadmin@ds019866.mlab.com:19866/myblogdb";
config.cookieMaxAge = 7 * 24 * 3600 * 100;
config.secret = 'MYBLOGSUPERSECRET';

module.exports = config;
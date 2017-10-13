const assert = require('chai').assert;
const request = require('request');
const tools = require('../tools');
const app = require('../app');

/* DO NOT DELET THE ITEM "test" IN "database.json" */
describe('tools',function(){
	it('hasKey should return true if key exist',function(){
		let result = tools.hasKey("test");
		assert.isTrue(result);
	});

	it('hasKey should return false if key does not exist',function(){
		let result = tools.hasKey("anykeynotexist");
		assert.isFalse(result);
	});

	it('findLocation should return the right url that shortcode points to',function(){
		let result = tools.findLocation("test");
		assert.equal(result,"http://test.com");
	});

	it("findStats should return the stats of the shortcode",function(){
		let result = tools.findStats("test");
		assert.isNotNull(result);
	});
});


describe('app', function () {
  before(function () {
    app.listen(8080);
  });

  it("Should return 201 if the posted combination of url and shortcode is valid", function(done){
  	request.post({
  			url: "http://localhost:8080/shorten",
    		method: "POST",
    		headers: {"content-type": "application/json"},
    		json: { url: "http://test.com" }
  		},function(err, res, body){
  			assert.equal(res.statusCode, 201);
  			done();
  	});
  });

  it("Should ruturn 400 if url is not present", function(done){
  	request.post({
  			url: "http://localhost:8080/shorten",
    		method: "POST",
    		headers: {"content-type": "application/json"},
    		json: { shortcode: "test" }
  		},function(err, res, body){
  			assert.equal(res.statusCode, 400);
  			done();
  	});
  });

  it("Should return 409 if the the desired shortcode is already in use",function(done){
  	request.post({
  			url: "http://localhost:8080/shorten",
    		method: "POST",
    		headers: {"content-type": "application/json"},
    		json: { url: "http://test.com", shortcode: "test" }
  		},function(err, res, body){
  			assert.equal(res.statusCode, 409);
  			done();
  	});
  });

  it("Should return 422 if the shortcode fails to meet the following regexp: ^[0-9a-zA-Z_]{4,}$",function(done){
  	request.post({
  			url: "http://localhost:8080/shorten",
    		method: "POST",
    		headers: {"content-type": "application/json"},
    		json: { url: "http://test.com", shortcode: "ts" }
  		},function(err, res, body){
  			assert.equal(res.statusCode,422);
  			done();
  	});
  });

  it("Should return 302 if the queried shortcode is existing in database",function(done){
  	request.get("http://localhost:8080/test",function(err, res, body){
  		assert.equal(res.statusCode,302);
  		done();
  	});
  });

  it("Should return 404 if the shortcode cannot be found in the database",function(done){
  	request.get("http://localhost:8080/shortcodecannotbefound",function(err, res, body){
  		assert.equal(res.statusCode,404);
  		done();
  	});
  });

  it("Should return 200 if GET /:shortcode/stats with a existing shortcode",function(done){
  	request.get("http://localhost:8080/test/stats",function(err, res, body){
  		assert.equal(res.statusCode,200);
  		done();
  	});
  });

  it("Should return 404 if GET /:shortcode/stats with a not existing shortcode",function(done){
  	request.get("http://localhost:8080/shortcodecannotbefound/stats",function(err, res, body){
  		assert.equal(res.statusCode,404);
  		done();
  	});
  });

  after(function () {
    app.close();
  });
});
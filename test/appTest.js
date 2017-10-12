const assert = require('chai').assert;
const http = require('http');
const request = require('request');
const tools = require('../tools');
const app = require('../app');

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

  it("Return 201 if the posted combination of url and shortcode is valid", function(){
  	http.request({
  			url: "http://localhost:8080/shorten",
    		method: "POST",
    		headers: {"content-type": "application/json"},
    		json: { url: "http://test.com" }
  		},function(res){
  			res.on('data', function(data){
  				assert.equal(data.statusCode, 201);
  			});
  	});
  });

  it("Return 409 if the the desired shortcode is already in use",function(){
  	http.request({
  			url: "http://localhost:8080/shorten",
    		method: "POST",
    		headers: {"content-type": "application/json"},
    		json: { url: "http://test.com", shortcode: "test" }
  		},function(res){
  			res.on('data', function(data){
  				assert.equal(data.statusCode,409);
  			});
  	});
  });

  after(function () {
    app.close();
  });
});
var http = require('http');
var url = require('url');
var fs = require('fs');
var RandExp = require('randexp');
var tools = require('./tools');

var server = module.exports = http.createServer(function (req, res) {
	var q = url.parse(req.url, true);

	//If the request is a POST
	if (req.method == 'POST') {
		var requestData = "";

		//If the POST requst aims to /shorten
		if(q.pathname == '/shorten'){
			req.on('data',function(data){
				requestData += data;
			});
			req.on('end',function(){
				var jsonData = JSON.parse(requestData)

				//If the url is provided
				if(jsonData.hasOwnProperty("url")){

					//If the shortcode is provided
					if(jsonData.hasOwnProperty("shortcode")){
						var regex = new RegExp("^[0-9a-zA-Z_]{4,}$");

						//If the provided shortcode meet the regex
						if(regex.test(jsonData.shortcode)){

							//If the shortcode is already exist
							if(tools.hasKey(jsonData.shortcode)){
								console.log("409 The the desired shortcode is already in use (Shortcodes are case-sensitive)");
								res.writeHead(409, {'Content-Type': 'text/plain'});
								res.end();

							//If the shortcode is available
							}else{
								var storeData = jsonData;
								storeData["stats"] = {
									startDate: new Date().toISOString(),
									lastSeenDate: null,
									redirectCount: 0
								};
								tools.pushToDatabase(storeData);
    							console.log("201 Created");
								console.log("Content-Type: " + '"' + req.headers['content-type'] + '"');
								console.log("");
								console.log("{");
    							console.log('	"shortcode": ' + '"' + jsonData.shortcode + '"');
    							console.log("}");
    							res.writeHead(201, {'Content-Type': 'text/plain'});
    							res.end();
							}
							
        				//If the provided shortcode doesn't meet the regex
						}else{
							console.log("422 The shortcode fails to meet the following regexp: ^[0-9a-zA-Z_]{4,}$");
							res.writeHead(422, {'Content-Type': 'text/plain'});
							res.end();
						}
						
        			//If the shortcode is null
					}else{
						var storeData = jsonData;
						var shortcode = new RandExp("^[0-9a-zA-Z_]{6}$").gen()
						storeData["shortcode"] = shortcode;
						storeData["stats"] = {
							startDate: new Date().toISOString(),
							lastSeenDate: null,
							redirectCount: 0
						};
						tools.pushToDatabase(storeData);
						console.log("201 Created");
						console.log("Content-Type: " + '"' + req.headers['content-type'] + '"');
						console.log("");
						console.log("{");
						console.log('	"shortcode": ' + '"' + shortcode + '"');
						console.log("}");
						res.writeHead(201, {'Content-Type': 'text/plain'});
						res.end();
					}

				//If the url is null
				}else{
					console.log("400 URL is not present")
					res.writeHead(400, {'Content-Type': 'text/plain'});
					res.end();
				}
			});

		//If the POST request doesn't point to /shorten
		}else{
			console.log("Error: Invalid POST request.");
		}
	};

	//If the request is a GET
	if (req.method == 'GET'){
		var pathArray = q.pathname.split('/');
		var shortcode = pathArray[1];

		//GET /:shortcode
		if(pathArray.length == 2 && shortcode != ''){

			//Queried shortcode exist in database
			if(tools.hasKey(shortcode)){
				tools.changeStats(shortcode);
				console.log("302 Found");
				console.log("Location: " + tools.findLocation(shortcode));
				res.writeHead(302, {'Content-Type': 'text/plain'});
				res.end();
			//Queried shortcode doesn't exist
			}else{
				console.log("404 The shortcode cannot be found in the system");
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.end();
			}

		//GET /:shortcode/stats
		}else if(pathArray.length == 3 && shortcode != '' && pathArray[2] == "stats"){

			//Queried shortcode exist in database
			if(tools.hasKey(shortcode)){
				console.log("200 OK");
				console.log('Content-Type: "application/json"');
				console.log("");
				console.log(tools.findStats(shortcode));
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end();

			//Queried shortcode doesn't exist
			}else{
				console.log("404 The shortcode cannot be found in the system");
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.end();
			}

		//Invalid GET request
		}else{
			console.log("Error: Invalid GET request.");
			res.end();
		}
	};
});
server.listen(8080);
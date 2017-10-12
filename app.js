var http = require('http');
var url = require('url');
var fs = require('fs');
var RandExp = require('randexp');

http.createServer(function (req, res) {
	//If the request is a POST
	if (req.method == 'POST') {
		var q = url.parse(req.url, true);
		var requestData = "";
		//If the POST requst aims to /shorten
		if(q.pathname == '/shorten'){
			req.on('data',function(data){
				requestData += data;
			});
			req.on('end',function(){
				var jsonData = JSON.parse(requestData)
				//If the url is provided
				if(jsonData.url != ""){
					//If the shortcode is provided
					if(jsonData.shortcode != ""){
						var regex = new RegExp("^[0-9a-zA-Z_]{4,}$");
						//If the provided shortcode meet the regex
						if(regex.test(jsonData.shortcode)){
							console.log("201 Created");
							console.log("Content-Type: " + '"' + req.headers['content-type'] + '"');
							console.log("");
							console.log("{")
        					console.log('	"shortcode": ' + '"' + jsonData.shortcode + '"');
        					console.log("}");
        				//If the provided shortcode doesn't meet the regex
						}else{
							console.log("422 The shortcode fails to meet the following regexp: ^[0-9a-zA-Z_]{4,}$");
						}
						
        			//If the shortcode is null
					}else{
						console.log(new RandExp("^[0-9a-zA-Z_]{6}$").gen());
					}
				//If the url is null
				}else{
					console.log("400 URL is not present")
				}
			});


			res.end();
		//If the POST request doesn't point to /shorten
		}else{
			console.log("Error: Invalid POST request.");
		}

	//If the request is a GET
	}else{
		console.log("GET request");
		res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
		res.end();
	}
  


  // if (req.method == 'POST'){
	 //  var q = url.parse(req.url, true);
	 //  if (q){

	 //  }else{

	 //  }


	 //  var filename = "." + q.pathname;
	 //  fs.readFile(filename, function(err, data) {
	 //    if (err) {
	 //      res.writeHead(404, {'Content-Type': 'text/html'});
	 //      console.log(err);
	 //      return res.end("404 Not Found");
	 //    } 
	 //    res.writeHead(200, {'Content-Type': 'text/html'});
	 //    res.write(data);
	 //    console.log(data);
	 //    return res.end();
	 //  });
  // } else {
  // 		console.log("get request");
  //   	res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
  //   	res.end();
  // };
}).listen(8080);
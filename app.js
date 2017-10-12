var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
	if (req.method == 'POST') {
		var q = url.parse(req.url, true);
		var requestData;
		if(q.pathname == '/shorten'){
			req.on('data',function(data){
				requestData = data;
			});
			req.on('end',function(){
				console.log(JSON.parse(requestData));
			});
			res.end();
		}else{
			console.log("Error: Invalid POST request.");
		}
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
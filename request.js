var request = require('request');
var fs = require('fs');
var requestData = JSON.parse(fs.readFileSync('./requestData.json', 'utf8'));

request.post({
	url: "http://localhost:8080/shorten",
    method: "POST",
    headers: {"content-type": "application/json"},
    json: requestData
	},function (err, res, body) {
        console.log("POST /shorten");
        console.log('Content-Type: "application/json"');
        console.log("");
        console.log("{");
        console.log('	"url": ' + '"' + requestData.url + '"');
        console.log('	"shortcode": ' + '"' + requestData.shortcode + '"');
        console.log("}");
    }
);
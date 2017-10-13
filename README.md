URL-Shortner
================

Hi Mr. Vasco Fernandes,

Here is my solution for the shorty challenge. Thank you so mush for your time to inspect it.

From requirements, I finally decided to solve it with Node.js. In oder to greatly simplify the code, I didn't use any framework for this application. Moreover, this application dosen't contain any GUI. I wrote a js file that can be excuted in Terminal for sending POST request, and every results will be logged and shown in Terminal.

Meanwhile, a full test suite inclue unit test and integration test is provided, which is implemented by MOCHA and Chai.

Following is the specification of the application.

Best regards,
Yang Liu

-------------------------------------------------------------------------

## File explanation

* app.js (Node.js file) : This is the main program of this application, will create a sever and listen on port 8080.
* tools.js (Node.js file) : This file packs several functions which are invoked in main program. The advantage of doing so is easier maintainance and convinient to conduct unit test.
* request.js (Node.js file): Due to without GUI, POST request have to be sent through Terminal. By excuting this file, a customised JSON will be POST to /shorten.
* JSONs (folder) :
	- database.json (JSON file): This JSON file serves as a lightweight database for this application. The schemema is:
	:shortcode: {
    	"url": :url,
    	"shortcode": :shortcode,
    	"stats": {
      		"startDate": :startDate,
      		"lastSeenDate": :lastSeenDate,
      		"redirectCount": :redirectCount
    	}
  	}
  	**Please DO NOT delete item "test" in "database.js", it is used for testing**

  	-requestData.json (JSON file): Customised JSON, users can define the url and shortcode in this file, and they will be read by request.js and POST to /shorten.

-------------------------------------------------------------------------





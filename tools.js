module.exports = {
	pushToDatabase: function(obj){
		var fs = require('fs');
		var configFile = fs.readFileSync('./JSONs/database.json');
		var config = JSON.parse(configFile);
		var shortcode = obj.shortcode;
		config[shortcode] = obj;
		var configJSON = JSON.stringify(config, null, 2);
		fs.writeFileSync('./JSONs/database.json', configJSON);
	},

	keyDuplicate: function(key){
		var fs = require('fs');
		var configFile = fs.readFileSync('./JSONs/database.json');
		var config = JSON.parse(configFile);
		if(config.hasOwnProperty(key)){
			return true;
		}else{
			return false;
		}
	}
};
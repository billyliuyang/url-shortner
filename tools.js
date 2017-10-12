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

	hasKey: function(key){
		var fs = require('fs');
		var configFile = fs.readFileSync('./JSONs/database.json');
		var config = JSON.parse(configFile);
		if(config.hasOwnProperty(key)){
			return true;
		}else{
			return false;
		}
	},

	findLocation: function(shortcode){
		var fs = require('fs');
		var configFile = fs.readFileSync('./JSONs/database.json');
		var config = JSON.parse(configFile);
		return config[shortcode].url;
	},

	changeStats: function(shortcode){
		var fs = require('fs');
		var configFile = fs.readFileSync('./JSONs/database.json');
		var config = JSON.parse(configFile);
		var configItem = config[shortcode];
		configItem.stats["lastSeenDate"] = new Date().toISOString();
		configItem.stats.redirectCount += 1;
		config[shortcode] = configItem;
		var configJSON = JSON.stringify(config, null, 2);
		fs.writeFileSync('./JSONs/database.json', configJSON);
	},

	findStats: function(shortcode){
		var fs = require('fs');
		var configFile = fs.readFileSync('./JSONs/database.json');
		var config = JSON.parse(configFile);
		var configItem = config[shortcode];
		return configItem.stats;
	}
};
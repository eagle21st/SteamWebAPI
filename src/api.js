//  you must have a deployer key to use steam web api
var request = require('request'),
	hostname = 'http://api.steampowered.com';

function SteamApi(deveploer_key){
	this.deveploer_key = deveploer_key;
}

SteamApi.prototype.ApiRequest = function(hostname, path, params, callback){
	// params is key:value object
	var payload = '';
	for(var key in params){
		payload += ((payload.indexOf('?')==-1 ? '?':'&')+key+'='+params[key]);
	}
	var url = hostname + path + payload;
	request.get(url, function(error, response, body){
		callback(JSON.parse(body));
	});
};

SteamApi.prototype.GetPlayerSummaries = function(req, res, steam_id){
	var path = '/ISteamUser/GetPlayerSummaries/v0002/';
	var params = {
		key: this.deveploer_key,
		steamids: steam_id,
		type: 'json'
	};
	this.ApiRequest(hostname, path, params, function(json_response){
		res.json(json_response);
	});
};

module.exports = SteamApi;
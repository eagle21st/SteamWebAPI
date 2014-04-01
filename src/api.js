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
		if(params[key] === undefined){
			return callback({error: 'No steamID detected!'});
		}
		payload += ((payload.indexOf('?')==-1 ? '?':'&')+key+'='+params[key]);
	}
	var url = hostname + path + payload;
	request.get(url, function(error, response, body){
		if(error){
			callback({error: error});
		}else if(response.statusCode == 200){
			callback(JSON.parse(body));
		}
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

SteamApi.prototype.GetFriendList = function(req, res, steam_id, level){
	var path = '/ISteamUser/GetFriendList/v0001/';
	var params = {
		key: this.deveploer_key,
		steamid: steam_id,
		relationship: 'friend',
		type: 'json'
	};
	
	this.ApiRequest(hostname, path, params, function(json_response){
		res.json(json_response);
	});
};

module.exports = SteamApi;
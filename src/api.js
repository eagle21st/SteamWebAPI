//  you must have a deployer key to use steam web api
var request = require('request'),
	hostname = 'http://api.steampowered.com';

function SteamApi(deveploer_key){
	this.deveploer_key = deveploer_key;
}

function ApiRequest(hostname, path, params, callback){
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
		}else if(response.statusCode != 200){
			callback({error: 'no response'});
		}
	});
}

SteamApi.prototype.GetPlayerSummaries = function(req, res, steam_ids, callback){
	// steam_ids should be id1,id2,id3...
	var path = '/ISteamUser/GetPlayerSummaries/v0002/';
	var params = {
		key: this.deveploer_key,
		steamids: steam_ids,
		type: 'json'
	};
	ApiRequest(hostname, path, params, callback);
};

SteamApi.prototype.GetFriendList = function(req, res, steam_id, callback){
	var path = '/ISteamUser/GetFriendList/v0001/';
	var params = {
		key: this.deveploer_key,
		steamid: steam_id,
		relationship: 'friend',
		type: 'json'
	};
	
	ApiRequest(hostname, path, params, callback);
};

module.exports = SteamApi;
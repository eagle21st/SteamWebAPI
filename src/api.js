//  you must have a deployer key to use steam web api
var rp = require('request-promise'),
	hostname = 'http://api.steampowered.com',
	utils = require('../lib/utils.js');

function SteamApi(deveploer_key){
	this.deveploer_key = deveploer_key;
}

function ApiRequest(hostname, path, params){
	var payload = '';
	for(var key in params){
		if(params[key] === undefined){
			return callback({error: 'API contains invalid params: '+key});
		}
		payload += ((payload.indexOf('?')==-1 ? '?':'&')+key+'='+params[key]);
	}
	var url = hostname + path + payload;
	return rp(url);
}

SteamApi.prototype.GetPlayerSummaries = function(steam_ids){
	// steam_ids should be id1,id2,id3...
	if (utils.isArray(steam_ids)) steam_ids = utils.flattenArray(steam_ids);
	var path = '/ISteamUser/GetPlayerSummaries/v0002/';
	var params = {
		key: this.deveploer_key,
		steamids: steam_ids,
		type: 'json'
	};
	return ApiRequest(hostname, path, params);
};

SteamApi.prototype.GetFriendList = function(steam_id){
	var path = '/ISteamUser/GetFriendList/v0001/';
	var params = {
		key: this.deveploer_key,
		steamid: steam_id,
		relationship: 'friend',
		type: 'json'
	};
	
	return ApiRequest(hostname, path, params);
};

module.exports = SteamApi;
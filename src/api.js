//  you must have a deployer key to use steam web api
var rp = require('request-promise'),
	hostname = 'http://api.steampowered.com',
	utils = require('../lib/utils.js');

function SteamApi(developerKey){
	this.developerKey = developerKey;
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

SteamApi.prototype.GetPlayerSummaries = function(steamIds){
	// steamIds should be id1,id2,id3...
	if (utils.isArray(steamIds)) steamIds = utils.flattenArray(steamIds);
	var path = '/ISteamUser/GetPlayerSummaries/v0002/';
	var params = {
		key: this.developerKey,
		steamids: steamIds,
		type: 'json'
	};
	return ApiRequest(hostname, path, params);
};

SteamApi.prototype.GetFriendList = function(steamId){
	var path = '/ISteamUser/GetFriendList/v0001/';
	var params = {
		key: this.developerKey,
		steamid: steamId,
		relationship: 'friend',
		type: 'json'
	};
	
	return ApiRequest(hostname, path, params);
};

module.exports = SteamApi;
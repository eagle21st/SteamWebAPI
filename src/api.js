//  you must have a deployer key to use steam web api
var rp = require('request-promise'),
	hostname = 'http://api.steampowered.com',
	utils = require('../lib/utils.js'),
	_ = require('underscore');

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

function buildParam(key, data, args) {
	var options = {
		key: key,
		type: 'json'
	}
	// extract args from data
	_.each(args, function(v, k){
		if (data.hasOwnProperty(k)) {
			if (v.flatten && utils.isArray(data[k]))
				options[k] = utils.flattenArray(data[k]);
			else
				options[k] = data[k];
		} else {
			if (v.required)
				throw new Error('Missing Params: [' + k, + ']');
		}
	});
	return options;
}

SteamApi.prototype.GetPlayerSummaries = function(data){
	// steamIds should be id1,id2,id3...
	var args = {'steamids': {required: 1, flatten: 1}},
		path = '/ISteamUser/GetPlayerSummaries/v0002/',
		params = buildParam(this.developerKey, data, args);
	return ApiRequest(hostname, path, params);
};

SteamApi.prototype.GetFriendList = function(data){
	var args = {'steamid': {required: 1}},
		path = '/ISteamUser/GetFriendList/v0001/',
		params = buildParam(this.developerKey, data, args);
	return ApiRequest(hostname, path, params);
};

SteamApi.prototype.GetRecentlyPlayedGames = function(data) {
	var args = {'steamid': {required: 1}, 'count': {}},
		path = '/IPlayerService/GetRecentlyPlayedGames/v0001/',
		params = buildParam(this.developerKey, data, args);
	return ApiRequest(hostname, path, params);
};

SteamApi.prototype.GetOwnedGames = function(data) {
	var args = {'steamid': {required: 1}, 'include_appinfo': {}, 'include_played_free_games': {}, 'appids_filter': {}},
		path = '/IPlayerService/GetOwnedGames/v0001/',
		params = buildParam(this.developerKey, data, args);
	return ApiRequest(hostname, path, params);
};

module.exports = SteamApi;
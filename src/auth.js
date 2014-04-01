// login support with openid
var openid = require('openid'),
	identifier = 'http://steamcommunity.com/openid';

function AuthenticationError(message){
	this.name = "AuthenticationError";
    this.message = (message || "Authentication Error");
}

AuthenticationError.prototype = Error.prototype;


function LocationError(message){
	this.name = "LocationError";
    this.message = (message || "Location URL Error");
}

LocationError.prototype = Error.prototype;

function SteamAuth(verify_callback, realm){
	try{
		this.relyingParty = new openid.RelyingParty(
			verify_callback, // Verification URL (yours)
			realm, // Realm (optional, specifies realm for OpenID authentication)
			true, // Use stateless verification
			false, // Strict mode
			[]); // List of extensions to enable and include
	}catch(e){
		console.error(e);
	}
}

SteamAuth.prototype.authenticate = function(req, res){
	this.relyingParty.authenticate(identifier, false, function(error, authUrl){
		if (error){
			var err1 = new AuthenticationError();
			throw err1;
		}else if (!authUrl){
			var err2 = new AuthenticationError();
			throw err2;
		}else{
			res.redirect(authUrl);
		}
	});
};

SteamAuth.prototype.verify = function(req, res, callback){
	this.relyingParty.verifyAssertion(req, function(error, result){
		if(error){
			console.error(error);
		}else if(!result.authenticated){
			var err = new AuthenticationError();
			throw err;
		}
		else{
			var steamIDURL = result.claimedIdentifier;
			try{
				res.locals.steamID = steamIDURL.match(/\/id\/(.*)/)[1];
				callback && callback(res.locals.steamID);
			}catch(e){
				console.error(e, steamIDURL);
			}
		}
	});
};

module.exports = SteamAuth;
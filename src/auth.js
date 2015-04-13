// login support with openid
var openid = require('openid'),
	identifier = 'http://steamcommunity.com/openid';

function AuthenticationError(message){
	this.name = "AuthenticationError";
    this.message = (message || "Authentication Error");
}

AuthenticationError.prototype = Error.prototype;

function SteamAuth(verify_callback, realm){
	try{
		this.relyingParty = new openid.RelyingParty(
			verify_callback, // Verification URL (yours)
			realm, // Realm (optional, specifies realm for OpenID authentication)
			true, // Use stateless verification
			false, // Strict mode
			[]); // List of extensions to enable and include
	}catch(e){
		throw new AuthenticationError(e);
	}
}

SteamAuth.prototype.authenticate = function(req, res){
	this.relyingParty.authenticate(identifier, false, function(error, authUrl){
		if (error){
			throw new AuthenticationError(error);
		}else if (!authUrl){
			throw new AuthenticationError('Auth url not defined');
		}else{
			res.redirect(authUrl);
		}
	});
};

SteamAuth.prototype.verify = function(req, res, callback){
	this.relyingParty.verifyAssertion(req, function(error, result){
		if(error){
			throw new AuthenticationError(error);
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
				throw new AuthenticationError(e);
			}
		}
	});
};

module.exports = SteamAuth;
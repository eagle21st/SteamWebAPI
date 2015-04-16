steam web api
-------------


# Usage
```
var steam = require('steam-webapi'),
	auth = new steam.Auth(<verify_callback_url>, <realm>),
	api = new steam.Api(<steam_key>);
```
## OpenID Login:
### handle login request from user: 
	auth.authenticate(req,res)
### handle callback request from steam: 
	auth.verify(req, res, function(steamId) {
		// do something with steamid
	});
>>>>>>> 988623b06eadddfe147a608562a01b8bb707ef3c


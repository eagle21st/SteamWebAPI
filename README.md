steam web api
-------------

# Install
```npm install steam-auth --save```

# Usage
```
var steam = require('steam-auth'),
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


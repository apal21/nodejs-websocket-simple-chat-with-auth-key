var server = require('ws').Server
var socket = new server({ port : 3000 })

var name

socket.on('connection', function (ws) {
	ws.send(JSON.stringify({
		name : "From Server",
		data : "Connected!!! Enjoy!!"
	}))
	ws.on('message', function (message) {
		message = JSON.parse(message)

		if (message.type == "key") {
			ws.authKey = message.data
			ws.clientName = message.name
			return
		}

		socket.clients.forEach(function (client) {
			if (client.authKey == ws.authKey) {
				if (client != ws) {
					client.send(JSON.stringify({
						name : ws.clientName,
						data : message.data
					}))
				}
			}
		})
	})
})

console.log("Server Ready")

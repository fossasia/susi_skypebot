var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
var http = require('http');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function() {
    console.log('listening to ', server.name, server.url);
});
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.appId,
    appPassword: process.env.appPassword
});

setInterval(function() {
		http.get(process.env.HerokuURL);
	}, 1200000);

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
//When bot is added by user
bot.on('contactRelationUpdate', function(message) {
    if (message.action === 'add') {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
            .address(message.address)
            .text("Hello %s... Thanks for adding me. You can talk to SUSI now.", name || 'there');
        bot.send(reply);
    }
});
//getting response from SUSI API upon receiving messages from User
bot.dialog('/', function(session) {
    var options = {
        method: 'GET',
        url: 'http://api.asksusi.com/susi/chat.json',
        qs: {
            timezoneOffset: '-330',
            q: session.message.text
        }
    };
//sending request to SUSI API for response 
    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        var ans = (JSON.parse(body)).answers[0].actions[0].expression;
        //responding back to user
        session.send(ans);

    })
});
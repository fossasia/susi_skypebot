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
    session.sendTyping();
    var options = {
        method: 'GET',
        url: 'http://api.susi.ai/susi/chat.json',
        qs: {
            timezoneOffset: '-330',
            q: session.message.text
        }
    };
    session.sendTyping();
    if(session.message.text.toLowerCase() == "get started"){
        var initial_card = new builder.HeroCard(session)
                .title('SUSI AI')
                .subtitle('Open Source personal assistant')
                .text('I am built by open source community Fossasia and I am evolving continuously.')            
                .buttons([
           builder.CardAction.openUrl(session, 'https://github.com/fossasia/susi_server', 'See Github')
        ])
        
        var reply = new builder.Message(session)
                .addAttachment(initial_card);
        session.sendTyping();
        session.send(reply);
    } else if(session.message.text.toLowerCase() == "start chatting"){
        var chat_card = new builder.ThumbnailCard(session)
            .title('Sample Queries')
            .text('You can try the following:')
            .buttons([
                builder.CardAction.imBack(session, 'What is FOSSASIA?', 'What is FOSSASIA?'),
                builder.CardAction.imBack(session, 'Who is Einstein?', 'Who is Einstein?'),
                builder.CardAction.imBack(session, 'Borders with INDIA', 'Borders with INDIA')
            ]);
        
        var reply1 = new builder.Message(session)
                .addAttachment(chat_card);
        session.sendTyping();
        session.send(reply1);
    } else {
        request(options, function(error, response, body) {
        if (error) throw new Error(error);
        var type = (JSON.parse(body)).answers[0].actions;
        var cards = [];
        if (type.length == 1 && type[0].type == "answer") {
            var msg = (JSON.parse(body)).answers[0].actions[0].expression;
            session.sendTyping();
            session.say(msg, msg);
        } else if (type.length == 1 && type[0].type == "table") {
            var data = (JSON.parse(body)).answers[0].data;
            var columns = type[0].columns;
            var key = Object.keys(columns);
            var msg, title;
            var count = JSON.parse(body).answers[0].metadata.count;

            for (var i = 0; i < count; i++) {
                msg = "";
                msg =key[1].toUpperCase() + ": " + data[i][key[1]] + "\n" + "\n" + key[2].toUpperCase() + ": " + data[i][key[2]];
                title = data[i][key[0]];
                cards[i] = new builder.HeroCard(session)
                    .title(title)
                    .text(msg)   
            }

            var reply = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments(cards);

            session.sendTyping();
            session.send(reply);

        } else if (type.length == 2 && type[1].type == "rss"){
            var data = JSON.parse(body).answers[0].data;
            var columns = type[1];
            var key = Object.keys(columns);
            var msg,title;

            for (var i = 0; i < 4; i++) {
            if(i==0){
                msg = (JSON.parse(body)).answers[0].actions[0].expression;
                session.sendTyping();
                session.say(msg, msg);
            } else{
                msg =key[2].toUpperCase() + ": " + data[i][key[2]] + "\n" + "\n" + key[3].toUpperCase() + ": " + data[i][key[3]];
                title  = data[i][key[1]];
                cards[i] = new builder.HeroCard(session)
                    .title(title)
                    .text(msg)
              }
            }
            var reply = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments(cards);
            
            session.sendTyping();
            session.send(reply);

        } else {
            var msg = "Oops looks like SUSI is taking a break try again later."
            session.sendTyping();
            session.say(msg, msg);
        }
    })
    }
});

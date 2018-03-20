var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var TwitterStream = require('twitter-stream-api'),
    fs = require('fs');

var keys = {
    consumer_key : '0N0Yq0ceGeVRXBA918EtfhK6K',
    consumer_secret : 'qbVzKfBLeiBw7He39tI11KHlbCziZkS43rZLjNxHCYs4VqbtdI',
    token : '848245039125774336-nkTeqhgSofKDzmHQ31TBZSNhJqSGaWY',
    token_secret : 'JzTtGqs7UORQXCFToyXbvrUdRhg4zXFhgUcPshmhB7em7'
};

var Twitter = new TwitterStream(keys, false);
Twitter.stream('statuses/filter', {
    track: 'god'
});

Twitter.on('statuses', function (obj) {
    console.log('statuses', obj);
});



Twitter.pipe(fs.createWriteStream('tweets.json'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/tweets.json');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


http.listen(3000, function(obj){
  console.log('listening on *:3000');
});

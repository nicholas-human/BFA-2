var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var keys = {
    consumer_key : '0N0Yq0ceGeVRXBA918EtfhK6K',
    consumer_secret : 'qbVzKfBLeiBw7He39tI11KHlbCziZkS43rZLjNxHCYs4VqbtdI',
    token : '848245039125774336-nkTeqhgSofKDzmHQ31TBZSNhJqSGaWY',
    token_secret : 'JzTtGqs7UORQXCFToyXbvrUdRhg4zXFhgUcPshmhB7em7'
};

var Twitter = require('node-tweet-stream');
var t = new Twitter(keys)

http.listen(3000, function(){
  console.log('listening on *:3000');

});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



// Initialize Tweet stream
t.on('tweet', (tweet) => {
  io.emit('tweetBlast', tweet.text);
});

t.track('god');



io.on('connection', function(socket){
  console.log('user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

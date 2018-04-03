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
  tweet.text = tweet.text.toLowerCase();
  const text = '<span>' +  _godReplace(tweet.text) + '</span>';

  io.emit('tweetBlast', text);
});

t.track('god');


io.on('connection', function(socket){
  console.log('user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

_godReplace = (str) => {
  str = str.replace('GOD', '<b>GOD</b>');
  str = str.replace('god', '<b>GOD</b>');
  str = str.replace('God', '<b>GOD</b>');
  str = str.replace('gOd', '<b>GOD</b>');
  str = str.replace('goD', '<b>GOD</b>');
  str = str.replace('GOd', '<b>GOD</b>');
  str = str.replace('gOD', '<b>GOD</b>');

  return str;
}

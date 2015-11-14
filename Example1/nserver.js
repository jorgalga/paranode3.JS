var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var inodes=0;
io.on('connection', function (socket) {
  socket.on('my other event', function (data) {
      console.log(data);
      inodes++;
      if(inodes==3){
        setTimeout(function(){
              socket.emit('startAnimation', { data: 'go' });      
              socket.broadcast.emit('startAnimation', { data: 'go' });      
        }, 1000);        
      }
  });
});
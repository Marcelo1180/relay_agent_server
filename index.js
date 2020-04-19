var express = require('express');
var grpc_server = require('./grpc_server');


var app = express();
app.use(express.json());

app.get('/status', function (req, res) {
  res.send('Ready!');
});

app.post('/dialog', function (req, res) {
  console.log(req.body);
  grpc_server.notifyAgent({
    user: 'Server',
    text: JSON.stringify(req.body)
  });
  res.send('Ok');
});

app.listen(3000, function () {
  grpc_server.server.start();
  console.log('Relay agent server listening! Rest server on 3000 & GRPC server on 5001');
});

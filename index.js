let express = require('express');
let fbs = require('./firebase_server');


let app = express();
app.use(express.json());

app.get('/status', function (req, res) {
  res.send('Ready!');
});

app.post('/dialog/:module', function (req, res) {
  let notify_key = fbs.notifyAgent('server', req.params.module, req.body);
  // let timeout = setTimeout(function(){
  //   res.send('Lo siento no hay ningun cliente escuchando');
  // }, 9000);
  // fbs.messages.on('child_changed', function(snapshot) {
  //   if(notify_key == snapshot.key){
  //     clearTimeout(timeout); 
  //     res.send(notify_key);
  //   }
  // });

  res.send({
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            "Text response from webhook 2"
          ]
        }
      }
    ],
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "this is a Google Assistant response 2"
              }
            }
          ]
        }
      }
    }
  });
});

let port = process.env.PORT || 8100;
app.listen(port, function () {
  // grpc_server.server.start();
  console.log('Relay agent server listening! Rest server on 8100 & GRPC server on 8101');
});

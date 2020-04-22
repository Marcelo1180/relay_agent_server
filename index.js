let express = require('express');
let fbs = require('./firebase_server');


let app = express();
app.use(express.json());

app.get('/status', function (req, res) {
  res.send('Ready!');
});

app.post('/dialog/:module', function (req, res) {
  // let notify = fbs.notifyAgent('server', 'hola a todos');
  // fbs.messages.on('child_changed'child_changed", function(snapshot) {
  // var changedPost = snapshot.val();
  // console.log("The updated post title is " + changedPost.title);
  // });
  // res.send(notify);
  // // console.log(req.body);
  // // grpc_server.notifyAgent({
  // //   user: 'Server',
  // //   text: JSON.stringify(req.body)
  // // });
  res.send({
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            "Text response from webhook"
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
                "textToSpeech": "this is a Google Assistant response"
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

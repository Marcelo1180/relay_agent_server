/**
 * Created by fahziar on 02/09/2015.
 */
var readline = require('readline');
// var firebase = require('firebase');
var admin = require('firebase-admin');

var username = "";

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var serviceAccount = require("./venom-db-agent-firebase-adminsdk-hfcix-3b469f06b6.json");
// var cobaChat = new firebase('https://coba-js.firebaseio.com/messages');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://venom-db-agent.firebaseio.com'
});
const db = admin.database();
var cobaChat = db.ref('messages');


rl.question("Enter your name\n", function (answer) {
  username = answer;
  console.log("Hello, " + answer);
  startChat();
});

function startChat(){
  cobaChat.limitToLast(1).on("child_added", function(snapshot, prevChildKey) {
      var newPost = snapshot.val();
      console.log(newPost.username + ': ' + newPost.message);
  });
  console.log("You can start chat now");
  rl.on('line', function (line) {
    cobaChat.push({
      username: username,
      message: line
    });
  });
}

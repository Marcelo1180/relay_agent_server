let admin = require('firebase-admin');


let service_account = require("./venom-db-agent-firebase-adminsdk-hfcix-3b469f06b6.json");
admin.initializeApp({
  credential: admin.credential.cert(service_account),
  databaseURL: 'https://venom-db-agent.firebaseio.com'
});
const db = admin.database();
let messages = db.ref('messages');

startChat();

function startChat(){
  messages.limitToLast(1).orderByChild('done').equalTo(false).on("child_added", function(snapshot, prevChildKey) {
    let message = messages.child(snapshot.key);
    message.update({
      'response': 'I completed the task',
      'done': true
    });
    console.log(message.key);
  });
}

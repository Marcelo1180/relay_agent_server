let admin = require('firebase-admin');


let service_account = require("./venom-db-agent-firebase-adminsdk-hfcix-3b469f06b6.json");
admin.initializeApp({
  credential: admin.credential.cert(service_account),
  databaseURL: 'https://venom-db-agent.firebaseio.com'
});
const db = admin.database();
let messages = db.ref('messages');

// Send message to all connected clients
function notifyAgent(username, module, message) {
  let message_push = messages.push({
    username: username,
    input: 'dialog_flow',
    module: module,
    message: message,
    done: false
  });
  return message_push.key;
}

// Define server with the methods and start it
module.exports = { messages, notifyAgent };

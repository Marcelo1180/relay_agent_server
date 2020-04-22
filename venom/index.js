let admin = require('firebase-admin');
let { Git } = require('./git/git');


// let service_account = require("./venom-db-agent-firebase-adminsdk-hfcix-3b469f06b6.json");
// admin.initializeApp({
//   credential: admin.credential.cert(service_account),
//   databaseURL: 'https://venom-db-agent.firebaseio.com'
// });
// const db = admin.database();
// let messages = db.ref('messages');
//


// startChat();
// let data['hola'] = function(){
//   console.log('X+=-----------------------------------------=+X');
//   console.log('holas');
//   console.log('X+=-----------------------------------------=+X');
// }

// let data = [];
// data['hola'] = function(){
//   console.log('X+=-----------------------------------------=+X');
//   console.log('hola');
//   console.log('X+=-----------------------------------------=+X');
// }
// data['otro'] = function(){
//   console.log('X+=-----------------------------------------=+X');
//   console.log('otro');
//   console.log('X+=-----------------------------------------=+X');
// }
// // data['hola']();
// if ('otro' in data){
//   console.log('X+=-----------------------------------------=+X');
//   console.log('si');
//   console.log('X+=-----------------------------------------=+X');
// }


function startChat(){
  messages.limitToLast(1).orderByChild('done').equalTo(false).on("child_added", function(snapshot, prevChildKey) {
    let message = snapshot.val();
    if(message.module == 'git'){
      xgit = new Git(message.message);
      xgit.open();
      // console.log('X+=-----------------------------------------=+X');
      // console.log('GIITT');
      // console.log('X+=-----------------------------------------=+X');
    }
    let done = messages.child(snapshot.key);
    done.update({
      'response': 'I completed the task',
      'done': true
    });
    console.log(message.key);
  });
}

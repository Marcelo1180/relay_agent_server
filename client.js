let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var readline = require('readline');

//Read terminal Lines
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Load the protobuf
var proto = grpc.loadPackageDefinition(
  protoLoader.loadSync('protos/chat.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

// const REMOTE_SERVER = '0.0.0.0:8101';
const REMOTE_SERVER = 'https://grpc-venom.herokuapp.com:8101/';

let username;

//Create gRPC client
let client = new proto.venom.Agent(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
);

//Start the stream between server and client
function startAgent() {
  let channel = client.join({ user: username });

  channel.on('data', onData);

  rl.on('line', function(text) {
    client.send({ user: username, type: 'notify', text: text }, res => {});
  });
}

//When server send a message
function onData(message) {
  if (message.user == username) {
    return;
  }
  // if(message.text){
  //   if(typeof(message.text) == 'object'){
  //     if(JSON.parse(message.text).hasOwnProperty('responseId')){
  //       console.log('----------------');
  //       console.log(JSON.parse(message.text).responseId);
  //       console.log('-----------------');
  //     }
  //   }
  // }
  console.log(`${message.user}: ${message.text}`);
}

//Ask user name then start the chat
rl.question('What is your name? ', answer => {
  username = answer;
  startAgent();
});

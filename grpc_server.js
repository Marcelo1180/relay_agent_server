let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

const server = new grpc.Server();
const SERVER_ADDRESS = '0.0.0.0:8101';

// Load protobuf
let proto = grpc.loadPackageDefinition(
  protoLoader.loadSync('protos/chat.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

let users = [];

// Receive message from client joining
function join(call, callback) {
  users.push(call);
  notifyAgent({ user: 'server', type: 'notify', text: JSON.stringify({'message' : 'new agent joined ...'}) });
}

// Receive message from client
function send(call, callback) {
  notifyAgent(call.request);
}

// Send message to all connected clients
function notifyAgent(message) {
  users.forEach(user => {
    user.write(message);
  });
}

// Define server with the methods and start it
server.addService(proto.venom.Agent.service, { join: join, send: send });
server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
module.exports = { server, notifyAgent };

"use strict";

class Command {
  execute() {
    throw new Error('You have to implement the method execute!');
  }
}

class OpenCommand extends Command {
  constructor(path) {
    super();
    this._path = path;
  }
  execute() {
    console.log(`cd ${this._path}`);
  }
}

class PullCommand extends Command {
  execute() {
    console.log('X+=-----------------------------------------=+X');
    console.log('git pull');
    console.log('X+=-----------------------------------------=+X');
  }
}

class PushCommand extends Command {
  constructor(commit_message) {
    super();
    this._commit_message = commit_message;
  }
  execute() {
    console.log('X+=-----------------------------------------=+X');
    console.log('git add .');
    console.log(`git commit -m "${this._commit_message}"`);
    console.log('git push');
    console.log('X+=-----------------------------------------=+X');
  }
}

class CheckoutCommand extends Command {
  constructor(branch) {
    super();
    this._branch = branch;
  }
  execute() {
    console.log('X+=-----------------------------------------=+X');
    console.log(`git checkout "${this._branch}"`);
    console.log('X+=-----------------------------------------=+X');
  }
}

// class Repository {
//   constructor() {
//     this._path = '';
//     this._branch = '';
//   }
// }

class Invoker {
  constructor() {
    this._command = new Command();
  }
  setCommand(command) {
    this._command = command;
  }
  executeCommand() {
    this._command.execute();
  }
}

class Git {
  constructor(body){
    this._body = body;
  }
  // static getDialogFlow(body){
  //   console.log('X+=-----------------------------------------=+X');
  //   console.log('hola');
  //   console.log('X+=-----------------------------------------=+X');
  // }
  open(){
    let cmd_open = new Invoker();
    cmd_open.setCommand(new OpenCommand('/home/marcelo/MARCELO'));
    cmd_open.executeCommand();
  }
}

// class DialogFlow {
//   ii
// }

module.exports = { Git };

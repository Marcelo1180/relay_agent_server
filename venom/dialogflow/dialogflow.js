let admin = require('firebase-admin');


class DialogFlow {
  constructor() {
    this._commands = [];
    messages.limitToLast(1).
      orderByChild('done').equalTo(false).
      on("child_added", function(snapshot, prevChildKey) {
        // if item is in commands then execute
        if(snapshot.name in this._commands) {
          this._commands[snapshot.name]();
        }
    });
  }
  listener(name, command) {
    this._commands[name] = command;
  }
}

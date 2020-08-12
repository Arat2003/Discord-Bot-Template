const path = require('path');
const fs = require('fs').promises;
const Command = require('./Command');

module.exports = class Loader {
  constructor(client) {
    this.client = client;
  }

  // Checks if the input is a class.
  isClass(input) {
    return typeof input === 'function' &&
    typeof input.prototype === 'object' &&
    input.toString().substring(0, 5) === 'class';
  }

  // Command loader
  async loadCommands(dir = '../commands') {
    // Starts by reading the directory 'commands' in the root of the project.
    let files = await fs.readdir(path.join(__dirname, dir));

    for(const file of files) {
      // Load the stats of each file
      let stat = await fs.lstat(path.join(__dirname, dir, file));

      /** 
       * If the file is a directory (folder), run the function once again.
       * This will make the commands folder look cleaner in case you start to write a lot of commands.
      */
      if(stat.isDirectory()) {
        loadCommands(path.join(dir, file));
      } else {
        // If it isn't, add the command to the Collection.
        if(file.endsWith('.js')) {
          // Require the class file.
          const commandFile = require(path.join(__dirname, dir, file));

          if(!this.isClass(commandFile)) throw new TypeError(`File ${file} doesn't export a class.`);

          // Initialize the constructor in each command file.
          const command = new commandFile(this.client, file.replace('.js', ''));

          if(!(command instanceof Command)) throw new TypeError(`File ${file} is not a child of Command's class.`);
          this.client.commands.set(command.name, command);
        }
      }
    }
  }
}
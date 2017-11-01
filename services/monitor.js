const Hue = require('../clients/hue');

class Monitor {
  constructor(username) {
    this.username = username;
    this.hueClient = new Hue('192.168.1.207', '8080', username, {});
    this.state = [];

    this.callbacks = {
      start: [],
      change: []
    };
  }

  async connect() {
    // TODO: Use SSDP to find hub.
    return this.hueClient.config();
  }

  start(config, pollingInterval = 1000) {
    this.hueClient.lights()
      .then((initialState) => {
        this.callbacks.start.map(callback => callback(config));

        this.state = initialState;
        setInterval(() => this.pollForChanges(), pollingInterval);
      })
      .catch(() => console.error('there was an error contacting the Hub'));
  }

  on(eventName, callback) {
    if (this.callbacks.hasOwnProperty(eventName)) {
      this.callbacks[eventName].push(callback);
    }

    return callback;
  }

  off(eventName, callback) {
    if (this.callbacks.hasOwnProperty(eventName) && this.callbacks[eventName].includes(callback)) {
      const index = this.callbacks[eventName].findIndex(callback);
      this.callbacks[eventName].splice(index, 1);
    }
  }

  pollForChanges() {
    //get state, look for changes, call change callbacks.
    this.callbacks.change.map(callback => callback());
  }
}

module.exports = Monitor;

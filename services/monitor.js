const Hue = require('../clients/hue');

class Monitor {
  constructor(username) {
    this.username = username;
    this.hueClient = new Hue('192.168.1.207', '8080', username, {});
    this.state = [];
  }

  async connect() {
    // TODO: Use SSDP to find hub.
    return this.hueClient.config();
  }

  start(pollingInterval = 1000) {
    setInterval(() => console.log('started'), pollingInterval);
  }

  onStart() {
    console.log('starting');
  }
}

module.exports = Monitor;

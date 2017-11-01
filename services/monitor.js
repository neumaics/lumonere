const Hue = require('../clients/hue');

const TRACKED_VALUES = [ 'on', 'brightness' ];

class Monitor {
  constructor(username, host, port) {
    this.username = username;
    this.hueClient = new Hue(host, port, username, {});
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
        this.callbacks.start.map(callback => callback(initialState));

        this.state = initialState;
        setInterval(() => this.poll(), pollingInterval);
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

  poll() {
    this.hueClient.lights()
      .then(newstate => {
        this.emitValueChanges(this.state, newstate);
        this.emitStateChange(this.state, newstate);
        this.emitStateChange(newstate, this.state);

        this.state = newstate;
      })
      .catch((error) => console.error(`there was an error while checking for changes: ${error}`));
  }

  emit(changeEvent) {
    this.callbacks.change.map(callback => callback(changeEvent));
  }

  emitValueChanges(previousState, currentState) {
    previousState.forEach(prev => {
      const curr = currentState.find(l => l.id == prev.id);

      if (typeof curr != 'undefined') {
        Object.keys(prev).forEach(k => {
          if (TRACKED_VALUES.includes(k) && prev[k] != curr[k]) {
            this.emit({ id: prev.id, [k]: curr[k]});
          }
        });
      }
    });
  }

  emitStateChange(previousState, currentState) {
    currentState.forEach(light => {
      const prev = previousState.find(l => l.id == light.id);

      // TODO: clarify what needs to happen when a light is added/removed.
      if (typeof prev == 'undefined') {
        this.emit({ id: light.id });
      }
    });
  }
}

module.exports = Monitor;

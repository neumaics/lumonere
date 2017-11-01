const axios = require('axios');
const Light = require('../models/light');

class Hue {
  constructor(host, port, username, config) {
    this.clientConfig = config || {};

    this.client = axios.create({
      baseURL: `http://${host}:${port}/api/${username}`,
      timeout: this.clientConfig.timeout || 1000
    });
  }

  async config() {
    return this.apiCall('/config');
  }

  async lights() {
    const lights = await this.apiCall('/lights');

    return Promise.all(Object.keys(lights).map((id) => this.lightState(id)));
  }

  async lightState(id) {
    const response = await this.apiCall(`/lights/${id}`);

    return Light.fromHue(id, response);
  }

  async apiCall(resource) {
    const response = await this.client(resource);

    return response.data;
  }
}

module.exports = Hue;

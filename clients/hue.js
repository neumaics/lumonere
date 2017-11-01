const axios = require('axios');

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
    return this.apiCall(`/lights/${id}`);
  }

  async apiCall(resource) {
    const response = await this.client(resource);

    return response.data;
  }
}

module.exports = Hue;

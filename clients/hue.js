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
    const response = await this.client('/config');

    return response.data;
  }
}

module.exports = Hue;

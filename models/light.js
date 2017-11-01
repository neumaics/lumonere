class Light {
  constructor(id, name, on, brightness) {
    this.name = name;
    this.id = id;
    this.on = on;
    this.brightness = brightness;
  }

  static fromHue(id, hueLight) {
    return new Light(id, hueLight.name, hueLight.state.on, hueLight.state.bri);
  }
}

module.exports = Light;

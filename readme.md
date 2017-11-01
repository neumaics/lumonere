## Lumonere

Monitors lights connected to a Philips Hue bridge.

### Setup
Lumonere was built using Node.js version 8.

After cloning, run `npm install` to install prerequisites.

### Running

Currently, Lumonere requires npm or node to run by calling

`npm start <username> [host] [port]`

or

`node index.js <username> [host] [port]`

Where

- `<username>` is the username configured with the hub
- `[host]` is the hostname or IP address of the hub
- `[port]` is the port used to connect to the hub

### Stopping
Lumonere continuously runs checking for changes, `ctrl-c` will stop the process.

### Docker

If you don't want to install Node.js on your machine, you can use the provided dockerfile.

#### Build
`npm run image:build`

#### Run
`docker run --rm -t neumaics/lumonere newdeveloper 192.168.1.207 8080`

or

`npm run image:run newdeveloper 192.168.1.207 8080`

### Roadmap
* Increased test coverage
* SSDP connection with fallback
* Better error handling
* Improved exception recovery

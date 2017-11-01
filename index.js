const lumonere = require('commander');
const pkg = require('./package.json');

const Monitor = require('./services/monitor');

const env = {
  username: '',
  host: '',
  port: 0
};

const prettyPrint = (obj) => console.log(JSON.stringify(obj, null, 2));

lumonere
  .version(pkg.version)
  .arguments('<username> [host] [port]')
  .action((username, host, port) => {
    env.username = username;
    env.host = host;
    env.port = port;
  });

lumonere.parse(process.argv);

if (env.username) {
  const monitor = new Monitor(env.username, env.host, env.port);

  monitor.on('start', prettyPrint);
  monitor.on('change', prettyPrint);

  monitor.connect()
    .then((config) => monitor.start(config))
    .catch(error => console.error(`there was an error connecting to the hub: ${error}`));
} else {
  console.error('Please provide a username for the Philips Hub');
}

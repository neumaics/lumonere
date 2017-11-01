const lumonere = require('commander');
const pkg = require('./package.json');

const Monitor = require('./services/monitor');
const env = {
  username: ''
};

lumonere
  .version(pkg.version)
  .arguments('<username>')
  .action((username) => {
    env.username = username;
  });

lumonere.parse(process.argv);

if (env.username) {
  const monitor = new Monitor(env.username);
  monitor.connect()
    .then(monitor.start)
    .catch(error => console.error(`there was an error connecting to the hub: ${error}`));
} else {
  console.error('Please provide a username for the Philips Hub');
}

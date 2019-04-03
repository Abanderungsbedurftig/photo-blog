const path = require('path');
const nconf = require('nconf');

nconf.argv()
     .env()
     .file({file: path.join(__dirname, process.env.NODE_ENV === 'production' ? 'config.json' : 'exampleConfig.json')})

module.exports = nconf

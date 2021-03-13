const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});
const server = require('./app');
const apiPort = process.env.PORT || 5000;

server.listen(apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
});

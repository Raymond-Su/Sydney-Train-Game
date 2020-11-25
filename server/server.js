require('dotenv').config();
const server = require('./app');
const mongoose = require('mongoose');
const apiPort = process.env.PORT || 3000;

mongoose.connect(
  'mongodb+srv://' +
    `${process.env.MONGO_ATLAS_USERNAME}:` +
    `${process.env.MONGO_ATLAS_PASSWORD}` +
    `@node-rest-make10.akcrv.mongodb.net/` +
    `${process.env.MONGO_ATLAS_DB}` +
    `?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const connection = mongoose.connection;

connection.once('open', function () {
  console.log('MongoDB database connection established successfully');
});

server.listen(apiPort, () => {
  console.log(`Server running on port ${apiPort}`);
});

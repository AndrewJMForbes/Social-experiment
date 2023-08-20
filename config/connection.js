const { connect, connection } = require('mongoose');
connect('mongodb://localhost:27017/user');
module.exports = connection;
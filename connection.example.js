var mysql = require('mysql');

//databse connection
var connection = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
});

module.exports = connection;

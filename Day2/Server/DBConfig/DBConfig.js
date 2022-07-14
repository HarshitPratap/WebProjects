const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"expense"
});

connection.connect((err) =>{
    if (err) {
        console.log("Error", err);
        return;
    }
    console.log("connected... to db ");
});

module.exports = connection;
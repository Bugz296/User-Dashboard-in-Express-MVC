class Model{
    constructor(){
        var mysql = require('mysql');
        var db_config = require('../config');
        this.connection = mysql.createConnection(db_config);
        this.mysql = mysql;
    }
    query(statement){
        return new Promise((resolve, reject) => {
            this.connection.query(statement, function (err, rows, fields) {
                if(err){
                    return reject(err);
                }else{
                    return resolve(rows);
                }
            });
        });
    }
}
module.exports = Model;
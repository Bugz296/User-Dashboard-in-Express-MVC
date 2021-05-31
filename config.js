class Database{
    constructor(){
        this.host = 'localhost';
        this.user = 'root';
        this.pass = '';
        this.database = 'user_dashboard';
    }
}
module.exports = new Database;
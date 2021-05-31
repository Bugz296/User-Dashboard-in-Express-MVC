const e = require('express');
const Model = require('./Model');
class User extends Model{
    constructor(){
        super();
    }
    async deleteUserById(id){
        let mysql = this.mysql;
        let query = mysql.format(`DELETE FROM users WHERE id = ?;`, id);
        await this.query(query);
    }
    async editUserById(id, new_data){
        try{
            if(new_data.action == 'user_info'){
                let mysql = this.mysql;
                let query = mysql.format(`UPDATE users SET email = ?, first_name = ?, last_name = ?, user_level = ? WHERE id = ?;`, 
                    [new_data.email, new_data.first_name, new_data.last_name, new_data.user_level, id]);
                await this.query(query);
            }else{
                let mysql = this.mysql;
                let query = mysql.format(`UPDATE users SET password = ? WHERE id = ?;`, 
                    [new_data.password, id]);
                await this.query(query);
            }
        }catch(err){
            console.log('ERR:', err.sqlMessage);
        }
    }
    async getUserById(id){
        try{
            let mysql = this.mysql;
            let query = mysql.format(`SELECT * FROM users WHERE id = ?`, id);
            let result = await this.query(query);
            return result;
        }catch(err){
            console.log('ERR:', err.sqlMessage);
        }
    }
    async register_process(data){
        try{
            let mysql = this.mysql;
            let query = mysql.format(`INSERT INTO users (email, first_name, last_name, password) 
                VALUES (?, ?, ?, ?);`, [data.email, data.first_name, data.last_name, data.password]);
            await this.query(query);
        }catch(err){
            console.log('ERR:', err.sqlMessage);
        }
    }
    async signIn_process(data){
        try{
            let mysql = this.mysql;
            let query = mysql.format(`SELECT * FROM users 
                WHERE email = ? and password = ?`, [data.email, data.password]);
            let result = await this.query(query);
            return result;
        }catch(err){
            console.log('ERR:', err.sqlMessage);
        }
    }
    async getAllUsers(){
        try{
            let mysql = this.mysql;
            let query = mysql.format(`SELECT * FROM users`);
            let result = await this.query(query);
            return result;
        }catch(err){
            console.log('ERR:', err.sqlMessage);
        }
    }
}
module.exports = new User;
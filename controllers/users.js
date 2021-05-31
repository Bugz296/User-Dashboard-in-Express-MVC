const e = require('express');
const user = require('../models/user');
const Controller = require('./Controller');
class Users extends Controller{
    constructor(){
        super();
    }
    
    async deleteUser(req, res){
        let result = await user.deleteUserById(req.params.id, req.body);
        req.session.msg = ["Successfully Deleted", "success"];
        res.redirect('/home');
    }
    async delete(req, res){
        let html = {};
        html.title = "Delete User";
        let userdata = req.session.userdata;
        let del_user_data = await user.getUserById(req.params.id);
        res.render('users/delete', {html, userdata, del_user_data});
    }
    async editUser(req, res){
        let result = await user.editUserById(req.params.id, req.body);
        res.redirect(`/users/edit/${req.params.id}`);
    }
    async edit(req, res){
        let html = {};
        html.title = "Edit User";
        let userdata = req.session.userdata;
        let edit_user_data = await user.getUserById(req.params.id);
        res.render('users/edit', {html, userdata, edit_user_data});
    }
    async addNewUser(req, res){
        let html = {};
        html.title = "Add User";
        let userdata = req.session.userdata;
        res.render('users/new', {html, userdata});
    }
    async home(req, res){
        let userdata = req.session.userdata;
        let msg = req.session.msg;
        if(userdata.isLoggedin && userdata.user_level == 9){
            let html = {};
            html.title = "Admin";
            let list_of_users = await user.getAllUsers();
            res.render('dashboards/admin', {html, userdata, list_of_users, msg});
        }else if(userdata.isLoggedin && userdata.user_level == 0){
            let html = {};
            html.title = "Home";
            res.render('dashboards/user', {html, userdata, msg});
        }
        res.end();
    }
    async index(req, res){
        let html = {};
        html.title = "Index";
        res.render('index', {html});
        res.end();
    }

    async signIn(req, res){
        let html = {};
        html.title = "Sign in";
        res.render('users/signin', {html});
        res.end();
    }
    async signInUser(req, res){
        let result = await user.signIn_process(req.body);
        if(result){
            let user_data = {
                isLoggedin: true,
                id: result[0].id,
                email: result[0].email,
                firstname: result[0].first_name,
                lastname: result[0].last_name,
                user_level: result[0].user_level
            }
            req.session.userdata = user_data;
            res.redirect('/home');
        }else{
            res.redirect('/users/signin');
        }
    }
    async register(req, res){
        let html = {};
        html.title = "Registration";
        res.render('users/register', {html});
        res.end();
    }
    async registerUser(req, res){
        user.register_process(req.body);
        res.redirect('/users/new');
    }
    async signOutUser(req, res){
        req.session.destroy();
        res.redirect('/');
    }
}
module.exports = new Users;
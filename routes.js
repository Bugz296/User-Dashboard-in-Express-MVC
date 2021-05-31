const Express = require("express");
const Router = Express.Router();
const UsersController = require(`./controllers/users`);

Router.get("/", UsersController.index);
Router.get("/users/signin", UsersController.signIn);
Router.post("/users/signin_user", UsersController.signInUser);
Router.get("/users/register", UsersController.register);
Router.post("/users/register_user", UsersController.registerUser);
Router.get("/home", UsersController.home);
Router.get("/users/signout_user", UsersController.signOutUser);
Router.get("/users/new", UsersController.addNewUser);
Router.get("/users/edit/:id", UsersController.edit);
Router.post("/users/edit_user/:id", UsersController.editUser);
Router.get("/users/delete/:id", UsersController.delete);
Router.post("/users/delete_user/:id", UsersController.deleteUser);

module.exports = Router;
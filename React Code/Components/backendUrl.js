var _ = require('underscore');
export const baseUrl = 'http://localhost/connection.php';
export const userUrl = 'http://localhost/users.php';
export var globalData = '';
export var User = {user: "Login", logged: false};

export function updateGlobalData(val){
    globalData = _.sortBy(val, "Name");
}

export function authUser(){
    return User;
}
// Receive object with name and logged state(true or false) to assign User
export function authentication(data){
    User.user = data.user;
    User.logged = data.state;
}

export function Logout(){
    User.user = "Login";
    User.logged = false;
}

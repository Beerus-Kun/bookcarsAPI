const jwt = require('jsonwebtoken');
const Defaults = require('./default');

const auth = {};

function checkRole(data, id_role){
    for(let role of data.role){
        if((role.id_role == id_role)&&(role.is_active == true))
        return true;
    }
    return false;
}

function hasRole(data){
    for(let role of data.role){
        return true;
    }
    return false;
}

auth.tokenData = (req) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return null;

    const token = authorizationHeader.split(' ')[1];
    var result = null;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            result = data;
        }
    })
    return result;
}

auth.authenLogined = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return res.sendStatus(401);

    const token = authorizationHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        if (!hasRole) return res.sendStatus(403);
        next();
    })
}

auth.authenStaff = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return res.sendStatus(401);

    const token = authorizationHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        if (!checkRole(data, Defaults.roleStaff)) return res.sendStatus(403);
        next();
    })
}

auth.authenCustomer = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return res.sendStatus(401);

    const token = authorizationHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        if (!checkRole(data, Defaults.roleCustomer)) return res.sendStatus(403);
        else next();
    })
}

auth.authenDriver = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return res.sendStatus(401);

    const token = authorizationHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        if (!checkRole(data, Defaults.roleDriver)) return res.sendStatus(403);
        else next();
    })
}

module.exports = auth;
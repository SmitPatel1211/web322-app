const mongoose = require('mongoose');
var Schema = mongoose.Schema ;
const bcrypt = require('bcryptjs');

var userSchema = new Schema({
    "userName": {
        "type": String,
        "unique": true
    },
    "password": String,
    "email": String,
    "loginHistory": [{
        "dateTime": Date,
        "userAgent": String
    }]
})
let User;

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb+srv://webapp:121abc@webapp.xjlxc4v.mongodb.net/?retryWrites=true&w=majority");

        db.on('error', (err)=>{
            reject(err); 
        });
        db.once('open', ()=>{
           User = db.model("users", userSchema);
           resolve();
        });
    });
};

module.exports.registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        if (userData.password === userData.password2) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(userData.password, salt, function (err, hash) {
                    userData.password = hash;
                    let newUser = new User(userData);
                    newUser.save((err) => {
                        if (err) {
                            if (err.code == 11000) {
                                reject("username is already Taken");
                            }
                            else {
                                reject('Error connecting the the server: ${err}');
                            }
                        }
                        else {
                            resolve();
                        };
                    })
                    if (err)
                        reject("password encription error");
                })
            })
        }
        else {
            reject("passwords do not match try again");
        }
    })
}


module.exports.checkUser = (userData) =>{
    return new Promise((resolve, reject) => {
        User.find({ userName: userData.userName }).exec()
            .then((users) => {
                if (users.length == 0) {
                    reject("user not found!! : " + userData.userName);
                }
                else {
                    bcrypt.compare(userData.password, users[0].password)
                        .then((ok) => {
                            if (ok) {
                                users[0].loginHistory.push({
                                    dateTime: (new Date()).toString(),
                                    userAgent: userData.userAgent
                                });
                                User.updateOne({ userName: users[0].userName },
                                    { $set: { loginHistory: users[0].loginHistory } }
                                ).exec()
                                    .then(() => {
                                        resolve(users[0]);
                                    }).catch((err) => {
                                        reject(" error veryfing user try again: " + err);
                                    });
                            }
                            else{

                            reject(" password incorrect please check user and password : " + userData.userName);
                            }
                    });
                }
            }).catch(() => {
                reject("User not found!!: " + userData.userName);
            })
    })
}


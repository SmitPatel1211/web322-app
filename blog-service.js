const fs = require("fs");

let posts = [];
let categories = [];

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/posts.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                posts = JSON.parse(data);

                fs.readFile('./data/categories.json', 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        categories = JSON.parse(data);
                        resolve();
                    }
                });
            }
        });
    });
}

module.exports.getAllPosts = function(){
    return new Promise((resolve,reject)=>{
        (posts.length > 0 ) ? resolve(posts) : reject("SORRY ERROR!!"); 
    });
}

module.exports.getPostsByCategory = function(category){
    return new Promise((resolve,reject)=>{
        let post_f = posts.filter(post=>post.category == category);

        if(post_f.length == 0){
            reject("SORRY ERROR!!")
        }else{
            resolve(post_f);
        }
    });
}

module.exports.getPostsByMinDate = function(minDateStr) {
    return new Promise((resolve, reject) => {
        let post_f = posts.filter(post => (new Date(post.postDate)) >= (new Date(minDateStr)))

        if (post_f.length == 0) {
            reject("SORRY ERROR!!")
        } else {
            resolve(post_f);
        }
    });
}

module.exports.getPostById = function(id){
    return new Promise((resolve,reject)=>{
        let postfound = posts.find(post => post.id == id);

        if(postfound){
            resolve(postfound);
        }else{
            reject("no result returned");
        }
    });
}

module.exports.addPost = function(postData){
    return new Promise((resolve,reject)=>{
        postData.published = postData.published ? true : false;
        postData.id = posts.length + 1;
        let now = new Date();
        postData.postDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        posts.push(postData);
        resolve();
    });
}

module.exports.getPublishedPosts = function(){
    return new Promise((resolve,reject)=>{
        let post_f = posts.filter(post => post.published);
        (post_f.length > 0) ? resolve(post_f) : reject("SORRY ERROR!!");
    });
}

module.exports.getPublishedPostsByCategory = function(category){
    return new Promise((resolve,reject)=>{
        let post_f = posts.filter(post => post.published && post.category == category);
        (post_f.length > 0) ? resolve(post_f) : reject("SORRY ERROR!!");
    });
}

module.exports.getCategories = function(){
    return new Promise((resolve,reject)=>{
        (categories.length > 0 ) ? resolve(categories) : reject("SORRY ERROR!!"); 
    });
}
const fs = require('fs');
let posts = [];
let categories = [];



module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
      fs.readFile('./data/posts.json', (err, data) => {
        if (err) {
          reject(err);
        }
        posts = JSON.parse(data);
        resolve();
      });
      fs.readFile('./data/categories.json', (err, data) => {
        if (err) {
          reject(err);
        }
        categories = JSON.parse(data);
        resolve();
      });
    });
  };
  
  module.exports.getAllposts = function () {
    return new Promise((resolve, reject) => {
      if (posts.length == 0) {
        reject('NO RESULTS RETURNED');
      }
      resolve(posts);
    });
  };
  
  module.exports.getPublishedPosts() = function () {
    return new Promise((resolve, reject) => {
      var published = [];
      for (let len = 0; len < posts.length; len++) {
        if (posts[len].ispublished == true) {
          published.push(posts[len]);
        }
      }
      if (published.length == 0) {
        reject('NO RESULTS RETURNED');
      }
      resolve(posts);
    });
  };
  
  module.exports.getCategories = function () {
    return new Promise((resolve, reject) => {
      if (categories.length == 0) {
        reject('NO RESULTS RETURNED');
      }
      resolve(categories);
    });
  };
  
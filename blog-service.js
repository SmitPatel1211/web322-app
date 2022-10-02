//the fs.readFile method

const fs = require('fs');

//•	posts - type: array

let posts = [];

//•	categories - type: array
let categories = [];



module.exports.initialize = function () {
    return new Promise((resolve, reject) => {

      /*fs.readFile('somefile.json', 'utf8', (err, data) => {
     if (err) throw err;
     console.log(data);
    }); */
  
      fs.readFile('./data/posts.json', (err, data) => {
        if (err) {
          reject(err);
        }
        //assign that array to the posts array 

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
  

  //•	This function will provide the full array of "posts" objects using the resolve method of the 
  //returned promise.  

  module.exports.getAllposts = function () {

    return new Promise(
        (resolve, reject) => {

      if (posts.length == 0) {

        //the reject method 
        reject('NO RESULTS RETURNED'
        );
      }
      resolve(posts);
    });
  };
  
  //getPublishedPosts()
  /**•	This function will provide an array of "post" objects whose published property is true using the resolve method of the returned promise.  / */

  module.exports.getPublishedPosts = function ()
   {
    return new Promise((resolve, reject) => 
    {
      var published = posts.filter
      (f=>f.published==true);
//this function must invoke the reject method and pass a meaningful message, i.e. "no results returned".
      for (let len = 0; len < posts.length; len++) 
      {
        if (posts[len].ispublished == true)
         {
           published.push(posts[len]);
        }
      }

       if (published.length === 0)
        {
         reject('NO RESULTS RETURNED');
      }
      resolve(posts);
    });
  };
  
//getCategories()
//•	This function will provide the full array of "category" objects using the resolve method of the 
//returned promise.  
  
  module.exports.getCategories = function () {
    return new Promise((resolve, reject) => {
      if (categories.length == 0) {
        reject('NO RESULTS RETURNED');
      }
      resolve(categories);
    });
  };
  
//the fs.readFile method

const fs = require('fs');

//•	posts - type: array

let posts = [];

//•	categories - type: array
let categories = [];


const multer = require('multer');
const cloudinary = require('cloudinary').v2 ;
const streamifier = require('streamifier') ;



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
       
      });
      fs.readFile('./data/categories.json', (err, data) => {
        if (err) {
          reject(err);
        }
        categories = JSON.parse(data);
        
      });
      resolve();
    });
  };
  

  //•	This function will provide the full array of "posts" objects using the resolve method of the 
  //returned promise.  

  module.exports.getAllPosts = function () {

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
    return new Promise((resolve,reject)=>{

      const arr1=posts.filter(p=>p.published==true);

      if(posts.length==0){

       reject('no results returned');

      }
      else{

       resolve(arr1);

      }
   })
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


  module.exports.addPost=(postData)=>{
    //o	/posts?category=value 
    postData.published == undefined ? postData.published=false : postData.published=true;
    postData.id=post.length+1;
    post.push(postData);
   
    return new Promise((resolve,reject)=>{//return a Promise

        if(post.length==0){

            reject('NO RESULTS!!!');

        }

        else if(post.length<0){

          reject('Invalid value');

      }


        else{
            resolve(post);
        }
    })
  }
  // the getPostsByCategory(category) function
  module.exports.getCategoryByPost = (id) => {
    return new Promise((resolve, reject) => {
      for (let s = 0; s < categories.length; s++) {
        var catData;
        if (categories[s].id == id) {
          catData = categories[s];
        }
      }
  
      if (catData) {
        resolve(catData);
      } 
      
      
      
      else {
        reject("CATEGORY NOT FOUND!!!!!!");
      }
    })
  }
 // Add the getPostsByMinDate(minDateStr) Function  
  module.exports.getPostsByMinDate = function (minDateStr) {
    var min_Date_Post = [];
    var promise = new Promise((resolve, reject) =>
     {
      if (post.length === 0) {
        reject("ERROR");
      }
      else {
        for (var s = 0; s < post.length; s++) {


          if (new Date(post[s].postDate) >= new Date(minDateStr))
          {
            min_Date_Post.push(post[s]);
          }
          else if (new Date(post[s].postDate) <= new Date(minDateStr))
          {
            return 0;
          }
        }
      }
      resolve(min_Date_Post);
    })
    return promise;
  }

  module.exports.getPostsByCategory = function (category) {
    var postCat = [];
    var promise = new Promise((resolve, reject) => {
      if (post.length === 0) {
        reject("no results returned");
      }
      else {
        for (var temp = 0; temp < post.length; temp++) {
          if (post[temp].category == category) {
            postCat.push(post[temp])
          }

          else if (post[temp].category != category) {
            resolve(postCat);
          }
        }
        resolve(postCat);
      }
    })
    return promise;
  }


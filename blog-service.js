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
        (posts.length > 0 ) ? resolve(posts) : reject("no results returned"); 
    });
}

module.exports.getPostsByCategory=(postcatId)=>{
    return new Promise((resolve,reject)=>{
     var pcategoryid=[];
     for(let s =0; s < posts.length;s++){
         if(posts[s].category==postcatId){
             pcategoryid.push(posts[s]);
         }
     }
     if(pcategoryid){
         resolve(pcategoryid);
     }else{
         reject("no results returned");
     }
    })
 } 

module.exports.getPostsByMinDate=(minDateStr)=>{
    var pdateData=[];

    return new Promise((resolve,reject)=>{
      
        for(let s =0; s < posts.length; s++){
        if(new Date(posts[s].postDate) >= new Date(minDateStr)){
            console.log("The postDate is more than the minimumdateSTR")
            pdateData.push(posts[s]);
        }
        resolve(pdateData);
    }    
    })
}

module.exports.getPostById=(id)=>{
    return new Promise((resolve,reject)=>{
      var post_id;
      for(let i=0;i<posts.length;i++){
          if(posts[i].id==id){
              post_id=posts[i];
          }
      }
      if(post_id){
          resolve(post_id);
      }else{
          reject("id not found");
      }
    })
  }

module.exports.addPost = function(postData){
    return new Promise((resolve,reject)=>{
        postData.published = postData.published ? true : false;
        postData.id = posts.length + 1;
        posts.push(postData);
        resolve();
    });
}

module.exports.getPublishedPosts = function(){
    return new Promise((resolve,reject)=>{
        let filteredPosts = posts.filter(post => post.published);
        (filteredPosts.length > 0) ? resolve(filteredPosts) : reject("no results returned");
    });
}

module.exports.getCategories = function(){
    return new Promise((resolve,reject)=>{
        (categories.length > 0 ) ? resolve(categories) : reject("no results returned"); 
    });
}


module.exports.getPublishedPostsByCategory=(category)=>{
    return new Promise((resolve,reject)=>{
        const arrCheck=posts.filter(tc=>tc.published==true && tc.category==category);
        if(posts.lenght==0){

            reject("NO result RETURNED");

        }
        

      resolve(arrCheck);

        
    })

}


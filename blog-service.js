var posts=[];
var categories=[];
const { doesNotReject } = require("assert");
const fs=require("fs");
const { resolve } = require("path");




exports.getAllPosts=()=>{
    return new Promise((resolve,reject)=>{
        if(posts.length==0){
            reject("no results returned");
        }
        else{
            resolve(posts);
        }
    })
}
        

exports.getPublishedPosts=()=>{
    return new Promise((resolve,reject)=>{
       const ar1=posts.filter(p=>p.published==true);
       if(posts.length==0){
        reject('no results returned');
       }
       else{
        resolve(ar1);
       }
    })
}

exports.getCategories=()=>{
    return new Promise((resolve,reject)=>{
        if(categories.length==0){
            reject('no results returned');
        }
        else{
            resolve(categories);
        }
    })
}

exports.addPost=(postData)=>{
    postData.published == undefined ? postData.published=false : postData.published=true;
    postData.id=posts.length+1;
    postData.postDate=new Date().toISOString().split('T',1)[0];
    posts.push(postData);
   // resolve(posts);
    return new Promise((resolve,reject)=>{
        if(posts.length==0){
            reject('no results');
        }
        else{
            resolve(posts);
        }
    })
}

exports.getPostsByCategory=(postcatId)=>{
   return new Promise((resolve,reject)=>{
    var cat_id=[];
    for(let s =0; s < posts.length;s++){
        if(posts[s].category==postcatId){
            cat_id.push(posts[s]);
        }
    }
    if(cat_id){
        resolve(cat_id);
    }else{
        reject("no results returned");
    }
   })
} 

exports.getPostsByMinDate=(minDateStr)=>{
    var date_data=[];
    return new Promise((resolve,reject)=>{
      
        for(let s =0; s < posts.length; s++){
        if(new Date(posts[s].postDate) >= new Date(minDateStr)){
            console.log("The postDate value is more than minmumDateStr")
            date_data.push(posts[s]);
        }
        resolve(date_data);
    }    
    })
}

exports.initialize=()=>{
  return new Promise((resolve,reject)=>{
      fs.readFile('./data/posts.json',(err,data)=>{
          if(err){
              reject('unable to read file');
          }
          else{
              posts=JSON.parse(data);
          }
      });

      fs.readFile('./data/categories.json',(err,data)=>{
          if(err){
              reject('unable to read file');
          }
          else{
              categories=JSON.parse(data);
          }
      })
      resolve();
  })
}

exports.getPostById=(id)=>{
  return new Promise((resolve,reject)=>{
    var id;
    for(let s=0;s<posts.length;s++){
        if(posts[s].id==id){
            id=posts[s];
        }
    }
    if(id){
        resolve(id);
    }else{
        reject("id not found. SORRY!!");
    }
  })
}

exports.getPublishedPostsByCategory=(category)=>{
    return new Promise((resolve,reject)=>{
        const arr=posts.filter(tc=>tc.published==true && tc.category==category);
        if(posts.lenght==0){
            reject("no results returned SORRY!!");
        }
        else{
            resolve(arr);

        }
    })

}



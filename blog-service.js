var posts=[];
var categories=[];
const { doesNotReject } = require("assert");
const fs=require("fs");
const { resolve } = require("path");


<<<<<<< HEAD
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

exports.getAllPosts=()=>{
    return new Promise((resolve,reject)=>{
=======


exports.getAllPosts=()=>{
    return new Promise((resolve,reject)=>{
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
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
<<<<<<< HEAD
       const arr1=posts.filter(p=>p.published==true);
=======
       const ar1=posts.filter(p=>p.published==true);
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
       if(posts.length==0){
        reject('no results returned');
       }
       else{
<<<<<<< HEAD
        resolve(arr1);
=======
        resolve(ar1);
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
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
<<<<<<< HEAD
    var postcategoryid=[];
    for(let i =0; i < posts.length;i++){
        if(posts[i].category==postcatId){
            postcategoryid.push(posts[i]);
        }
    }
    if(postcategoryid){
        resolve(postcategoryid);
=======
    var cat_id=[];
    for(let s =0; s < posts.length;s++){
        if(posts[s].category==postcatId){
            cat_id.push(posts[s]);
        }
    }
    if(cat_id){
        resolve(cat_id);
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
    }else{
        reject("no results returned");
    }
   })
} 

exports.getPostsByMinDate=(minDateStr)=>{
<<<<<<< HEAD
    var postdate_Data=[];
    return new Promise((resolve,reject)=>{
      
        for(let i =0; i < posts.length; i++){
        if(new Date(posts[i].postDate) >= new Date(minDateStr)){
            console.log("The postDate value is greater than minDateStr")
            postdate_Data.push(posts[i]);
        }
        resolve(postdate_Data);
=======
    var date_data=[];
    return new Promise((resolve,reject)=>{
      
        for(let s =0; s < posts.length; s++){
        if(new Date(posts[s].postDate) >= new Date(minDateStr)){
            console.log("The postDate value is more than minmumDateStr")
            date_data.push(posts[s]);
        }
        resolve(date_data);
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
    }    
    })
}

<<<<<<< HEAD
exports.getPostById=(id)=>{
  return new Promise((resolve,reject)=>{
    var postid;
    for(let i=0;i<posts.length;i++){
        if(posts[i].id==id){
            postid=posts[i];
        }
    }
    if(postid){
        resolve(postid);
    }else{
        reject("id not found");
=======
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
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
    }
  })
}

exports.getPublishedPostsByCategory=(category)=>{
    return new Promise((resolve,reject)=>{
        const arr=posts.filter(tc=>tc.published==true && tc.category==category);
        if(posts.lenght==0){
<<<<<<< HEAD
            reject("no results returned");
=======
            reject("no results returned SORRY!!");
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
        }
        else{
            resolve(arr);

        }
    })

}



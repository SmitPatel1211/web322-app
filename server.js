/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Smit Anjaykumar Patel Student ID: 104424213 Date: 02 octomber 2022
*
*  Cyclic Web App URL: https://brave-blue-bighorn-sheep.cyclic.app/about
*
*  GitHub Repository URL: https://github.com/SmitPatel1211/web322-app.git
*
********************************************************************************/



const express = require('express');

const path = require('path');

const service = require('./blog-service');
 
const app = express();


const multer = require('multer');
const cloudinary = require('cloudinary').v2 ;
const streamifier = require('streamifier') ;


// configure cloudinary
cloudinary.config({
    
    cloud_name: 'ddzbrotu5',
    api_key: '443325629289184',
    api_secret: 'X9KX_1V40PDN-ieoN7hEv_MIjFM',
    secure: true
});

 
 //"TODO: get all posts who have published==true"
 const HTTP_PORT = process.env.port || 8080;
 //	The server must listen on process.env.PORT || 8080

 function onHttpStart(){

    console.log(
        "Express http server listening on "+HTTP_PORT
        
    );
}
 
 app.use(express.static('public'));
 
 app.get('/', (req, res) => {

     res.redirect('/about');
 })
 
 app.get('/about', (req, res) => {
     res.sendFile(path.join(__dirname, 'views/about.html'));
 })

 app.get('/posts/add',(req, res)=> {
    res.sendFile(path.join(__dirname, 'views/addPost.html'))

 })
 


 ///blog
 app.get('/blog', (req, res) => {
     service.getPublishedPosts().then((data)=>{res.json({data});
    }).catch ((err)=>{res.json({"message: err" : err})});
 })


 //posts
 //then(data => res.json(data)).catch(err => res.json({"message: err" : err}));
 app.get('/posts', (req, res) => {

    if(req.query.category){
        service.getPostsByCategory(req.query.category).then((categoryId)=>{
            console.log("expected run");
            res.json({categoryId})
        }).catch((err)=>{
            res.json({message:err});
        })
    }
    else if(req.query.minDate){
        service.getPostsByMinDate(req.query.minDate).then((databydate)=>{
            res.json({databydate})
        }).catch((err)=>{
            res.json({message:"error"});
        })
    }
    else{
        service.getAllPosts().then((data)=>{
            res.json({data});
        }).catch((err)=>{
            res.json({message:err});
        })
    }
    
    
  });
 

//categories
app.get('/categories', (req, res) => {
    
     service.getCategories().then(data => res.json(data)).catch(err => res.json({"message: err" : err}));
})


app.post('/posts/add', (req, res) => {
    data.addPost(req.body).then(() => {
      res.redirect("/posts");
    })
}); 



//[ no matching route ]
 
app.use(function (req, res)
{
  res.status(404).send('ERROR : Page Not Found');
});







const upload = multer(); // no { storage: storage } since we are not using disk storage


app.post('/posts/add',upload.single("featureImage"),(req,res)=>{
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
    
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
            return result;
        }
    
        upload(req).then((uploaded)=>{
            processPost(uploaded.url);
        });
    }else{
        processPost("");
    }
     
    function processPost(imageUrl){
        req.body.featureImage = imageUrl;
        service.addPost(req.body).then(()=>{
          res.redirect("/posts");
        })     
    } 
    
  })

  

  app.get("/posts/:id", (req, res) => {
    service.getPostById(req.params.id).then((postData) => {
      res.json(postData)
    }).catch((err) => {
      res.send(err)
    })
  })


  


  app.get("/categories/:id", (req, res) => {
    data.getCategoryByPost(req.params.id).then((catData) => {
      res.json(catData)
    }).catch((err) => {
      res.send(err)
    })
  })


  app.get('*',(req,res)=>{
    res.status(404).send("Page Not Available  ");
})


service.initialize().then(()=>
{
    //the promise will reject if any error occurred during the process

        app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => 

{
    console.log('SORRY!! not able to read the file '+ err)

})
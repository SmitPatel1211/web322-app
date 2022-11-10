/*********************************************************************************
*  WEB322 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Smit Anjaykumar Patel Student ID: 104424213 Date: 21 octomber 2022
*
*  Cyclic Web App URL: https://brave-blue-bighorn-sheep.cyclic.app/about
*
*  GitHub Repository URL: https://github.com/SmitPatel1211/web322-app.git
*
********************************************************************************/



<<<<<<< HEAD
const express = require('express');
const blogData = require("./blog-service");
const multer = require("multer");
const stripJs=require('strip-js');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const path = require("path");
const app = express();



const HTTP_PORT = process.env.PORT || 8080;


=======
const express=require("express");
const path = require("path");
const blogData=require("./blog-service");
const multer=require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const stripJs=require('strip-js');
const upload = multer(); 
var app=express();
var PORT=process.env.PORT||8080;


>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
cloudinary.config({
    
    cloud_name: 'ddzbrotu5',
    api_key: '443325629289184',
    api_secret: 'X9KX_1V40PDN-ieoN7hEv_MIjFM',
    secure: true
});

<<<<<<< HEAD
const upload = multer();

const exphbs = require('express-handlebars');
app.set('view engine', '.hbs');


//fix the navigation issue
=======
 




const exphbs = require('express-handlebars');
app.set('view engine', '.hbs');
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
app.use(function(req,res,next){
    let route = req.path.substring(1);
    app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, "") : route.replace(/\/(.*)/, ""));
    app.locals.viewingCategory = req.query.category;
    next();
});

function onHTTPStart(){
    console.log("Express http server listening on "+PORT);
}

app.get('/',(req,res)=>{
    res.redirect('/blog');
})

app.use(express.static("views"));
<<<<<<< HEAD


app.get("/about",(req,res)=>{
    res.render("about");
});



app.engine('.hbs', exphbs.engine({ 

    extname: '.hbs',
    helpers: { 

        safeHTML: function(context) {
            return stripJs(context)
        },


        navLink: function(url, options){
            return '<li' + 
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
                '><a href="' + url + '">' + options.fn(this) + '</a></li>';
        },

        

        
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)

                throw new Error("Handlebars Helper equal needs 2 parameters");

            if (lvalue != rvalue) {
                return options.inverse(this);
            }
            
            
            else {
                return options.fn(this);
            }
        }        
    }
}));

app.use(express.static('public'));

app.get('/blog', async (req, res) => {

    
    let viewData = {};

    try{
        

        
        let posts = [];

        
        if(req.query.category){
            
            
            posts = await blogData.getPublishedPostsByCategory(req.query.category);
        }else{
            
            posts = await blogData.getPublishedPosts();
        }
        

        
        posts.sort((a,b) => new Date(b.postDate) - new Date(a.postDate));

        
        let post = posts[0]; 

       
        viewData.posts = posts;
        viewData.post = post;

    }catch(err){
        viewData.message = "no results";
    }

    try{
        
        let categories = await blogData.getCategories();

        
        viewData.categories = categories;
    }catch(err){
        viewData.categoriesMessage = "no results"
    }

    
    res.render("blog", {data: viewData})

});

=======
app.get("/about",(req,res)=>{
    res.render("about");
});


app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs',
    helpers: { 
        safeHTML: function(context) {
            return stripJs(context)
        },
        navLink: function(url, options){
            return '<li' + 
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
                '><a href="' + url + '">' + options.fn(this) + '</a></li>';
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }        
    }
}));

app.use(express.static('public'));



>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
app.get('/blog/:id', async (req, res) => {

    // Declare an object to store properties for the view
    let viewData = {};

    try{

        // declare empty array to hold "post" objects
        let posts = [];

        // if there's a "category" query, filter the returned posts by category
        if(req.query.category){
            // Obtain the published "posts" by category
            posts = await blogData.getPublishedPostsByCategory(req.query.category);
        }else{
            // Obtain the published "posts"
            posts = await blogData.getPublishedPosts();
        }

        // sort the published posts by postDate
        posts.sort((a,b) => new Date(b.postDate) - new Date(a.postDate));

        // store the "posts" and "post" data in the viewData object (to be passed to the view)
        viewData.posts = posts;

    }catch(err){
        viewData.message = "no results";
    }

    try{
        // Obtain the post by "id"
        viewData.post = await blogData.getPostById(req.params.id);
    }catch(err){
        viewData.message = "no results"; 
    }

    try{
        // Obtain the full list of "categories"
        let categories = await blogData.getCategories();

        // store the "categories" data in the viewData object (to be passed to the view)
        viewData.categories = categories;
    }catch(err){
        viewData.categoriesMessage = "no results"
    }

    // render the "blog" view with all of the data (viewData)
    res.render("blog", {data: viewData})
});


<<<<<<< HEAD
app.get('/posts',(req,res)=>{
    if(req.query.category){
        blogData.getPostsByCategory(req.query.category).then((categoryId)=>{
            res.render("posts",{posts:categoryId});
         
=======

app.get('/posts',(req,res)=>{
    if(req.query.category){//query /posts?category
        blogData.getPostsByCategory(req.query.category).then((categoryId)=>{
            res.render("posts",{posts:categoryId});
         //res.json({categoryId})
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
        }).catch((err)=>{
            res.json({message:err});
        })
    }
<<<<<<< HEAD
    else if(req.query.minDate){
=======
    else if(req.query.minDate){//query /posts?minDate
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
        blogData.getPostsByMinDate(req.query.minDate).then((databydate)=>{
            res.json({databydate})
        }).catch((err)=>{
            res.json({message:"error"});
        })
    }
    else{
        blogData.getAllPosts().then((data)=>{
<<<<<<< HEAD
            
            res.render("posts",{posts:data}); 
        }).catch((err)=>{
           
            res.render("posts",{message:"no results"});
        })
    }
=======
            //res.json({data});
            res.render("posts",{posts:data}); 
        }).catch((err)=>{
            //res.json({message:err});
            res.render("posts",{message:"SORRY!!"});
        })
    }
});

app.get('/blog', async (req, res) => {

   
    let viewData = {};

    try{
        

        
        let posts = [];

        
        if(req.query.category){
            
            
            posts = await blogData.getPublishedPostsByCategory(req.query.category);
        }else{
            
            posts = await blogData.getPublishedPosts();
        }
        

       
        posts.sort((a,b) => new Date(b.postDate) - new Date(a.postDate));

        
        let post = posts[0]; 

        
        viewData.posts = posts;
        viewData.post = post;

    }catch(err){
        viewData.message = "no results";
    }

    try{
       
        let categories = await blogData.getCategories();

        
        viewData.categories = categories;
    }catch(err){
        viewData.categoriesMessage = "no results"
    }

    
    res.render("blog", {data: viewData})

>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
});


app.get('/posts',(req,res)=>{
    blogData.getAllPosts().then((data)=>{
       res.render("posts",{posts:data});   
    }).catch((err)=>{
<<<<<<< HEAD
       res.render("posts",{message:"no results"});
=======
       res.render("posts",{message:"SORRY!!"});
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
    })
});

app.get('/categories',(req,res)=>{
<<<<<<< HEAD

    blogData.getCategories().then((data)=>{
       
        res.render("categories",{categories:data})

    }).catch((err)=>{
        
        res.render("categories",{message:"no results"});
    })
});

=======
    blogData.getCategories().then((data)=>{
        
        res.render("categories",{categories:data})
    }).catch((err)=>{
        res.json({"message. SORRY!! ":err})
    })
});

>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
app.get('/posts/add',(req,res)=>{
    res.render("addPost");
})

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
        blogData.addPost(req.body).then(()=>{
        res.redirect("/posts");
        })
    
<<<<<<< HEAD
        
=======
       
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
        
    } 
    
})


app.get("/posts/:id",(req,res)=>{
    blogData.getPostById(req.params.id).then((data)=>{
        res.json({data});
    }).catch((err)=>{
        res.json({message:err});
    })
});



app.get('*',(req,res)=>{
   res.render("404");
})

blogData.initialize().then(()=>{
    app.listen(PORT,onHTTPStart());
}).catch(()=>{
<<<<<<< HEAD
 console.log("unable to read file");
=======
 console.log("SORRY!!");
>>>>>>> d18797b (Merge branch 'main' of https://github.com/SmitPatel1211/web322-app)
});

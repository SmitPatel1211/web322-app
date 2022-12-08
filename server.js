/*********************************************************************************
*  WEB322 – Assignment 05
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Smit Anjaykumar Patel Student ID: 104424213 Date: 21 octomber 2022
*
*  Cyclic Web App URL: https://good-gray-piglet-cap.cyclic.app/blog
*
*  GitHub Repository URL: https://github.com/SmitPatel1211/web322-app
*
********************************************************************************/

const authData = require('./auth-service.js'); 
const express = require('express');
const blogData = require("./blog-service");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const exphbs = require("express-handlebars");
const path = require("path");
const stripJs = require('strip-js');
const clientSessions = require('client-sessions');

const app = express();

const PORT = process.env.PORT || 8080;

const user = {
    userName: "",
    password: "",
    email: ""
};

function ensureLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
};

app.use(clientSessions({
    cookieName: "session", 
    secret: "WEB322_Assignment6_Client-Sessions", 
    duration: 2 * 60 * 1000, 
    activeDuration: 1000 * 60 
}));


app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});





const upload = multer();

cloudinary.config({
    
    cloud_name: 'ddzbrotu5',
    api_key: '443325629289184',
    api_secret: 'X9KX_1V40PDN-ieoN7hEv_MIjFM',
    secure: true
});


app.set('view engine', '.hbs');
app.use(function(req,res,next){
    let route = req.path.substring(1);
    app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, "") : route.replace(/\/(.*)/, ""));
    app.locals.viewingCategory = req.query.category;
    next();
});


function onHTTPStart(){
    console.log("Express http server listening on " + PORT + " . "); 
}


app.get('/',(req,res)=>{
    res.redirect('/blog');
})

app.use(express.static("views"));
app.get("/about",(req,res)=>{
    res.render("about");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
})
app.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect('/');
});

app.get("/userHistory", ensureLogin, (req, res) => {
    console.log(req.session.user);
    res.render("userHistory");
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
        },
        
    formatDate: function(dateObj){
        let year = dateObj.getFullYear(0);
        let month = (dateObj.getMonth() + 1).toString();
        let day = dateObj.getDate().toString();
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2,'0')}`;
}

               
    }
}));

app.use(express.static('public'));
app.get('/blog',ensureLogin, async (req, res) => {

    
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


app.get('/blog/:id', async (req, res) => {

    
    let viewData = {};

    try{

        
        let posts = [];

       
        if(req.query.category){
            
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


app.get('/posts',ensureLogin,(req,res)=>{
    if(req.query.category){
        blogData.getPostsByCategory(req.query.category).then((categoryId)=>{
            res.render("posts",{posts:categoryId});
         
        }).catch((err)=>{
            res.json({message:err});
        })
    }
    else if(req.query.minDate){
        blogData.getPostsByMinDate(req.query.minDate).then((databydate)=>{
            res.json({databydate})
        }).catch((err)=>{
            res.json({message:"error"});
        })
    }
    else{
        blogData.getAllPosts().then((data)=>{
            if(data.length > 0) {
                res.render("posts",{posts:data}); 

            }
            else{
                res.render("posts",{message:"no results"});
    
            }
        }).catch((err)=>{
     
            res.render("posts",{message:"no results"});
        })
    }
});
app.get('/posts/add',ensureLogin,(req,res)=>{
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
    
               
    } 
    
})


app.get('/posts',ensureLogin,(req,res)=>{
    blogData.getAllPosts().then((data)=>{
        if(data.length > 0) {
            res.render("posts",{posts:data});   

        }
        else{
            res.render("posts",{message:"no results"});

        }
    }).catch((err)=>{
       res.render("posts",{message:"no results"});
    })
});

app.get('/categories',ensureLogin,(req,res)=>{
    blogData.getCategories().then((data)=>{
        if(data.length > 0) {
            res.render("categories",{categories:data})

        }
        else{
            res.render("categories",{message:"no results"});

        }
    }).catch((err)=>{
        res.json({"message":err})
    })
});




app.get("/posts/:value",(req,res)=>{
    blogData.getPostById(req.params.value).then((resArr) => {res.send(resArr);})
    .catch((message) => {res.send(message);});
});

app.get('/categories/delete/:id',(req,res)=>{
    blogData.deleteCategoryById(req.params.id).then(() => {
        res.redirect("/categories");
    }).catch(() => {
        res.status(500).send("Unsuccessful delete operator-categories");
    });
});

app.get('/posts/delete/:id',(req,res)=>{
    blogData.deletePostById(req.params.id).then(() => {
        res.redirect("/posts");
        console.log("deleted");
    }).catch(() => {
        res.status(500).send("Unsuccessful delete operator-posts");
    });
});



app.use(express.urlencoded({extended: true}));
app.get('/categories/add',(req,res)=>{
    res.render("addCategory");
})

app.post("/categories/add",(req,res) =>{
    blogData.addCategory(req.body)
    .then(() =>{
        res.redirect("/categories")
    })
})

app.get('*',(req,res)=>{
   res.render("404");
})

blogData.initialize()
.then(authData.initialize)
.then(function(){
    app.listen(PORT, onHTTPStart())
}).catch(function(err){
    console.log("unable to start server: " + err);
});



app.post("/register", (req, res) => {
    authData.registerUser(req.body).then(() => {
        res.render("register", { successMessage: "User created" });
    }).catch((err) => {
        res.render("register", { errorMessage: err, userName: req.body.userName, password: req.body.password });
    })
})

app.post("/login", (req, res) => {
    req.body.userAgent = req.get('User-Agent');
    authData.checkUser(req.body).then((user) => {
        req.session.user = {
            userName: user.userName,
            email: user.email,
            loginHistory: user.loginHistory
        }
        res.redirect('/posts');
    }).catch((err) => {
        res.render("login", { errorMessage: err, userName: req.body.userName });
    })
});


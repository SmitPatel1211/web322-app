
 const express = require('express');

 const path = require('path');

 const service = require('./blog-service');
 
 const app = express();
 
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
 


 ///blog
 app.get('/blog', (req, res) => {
     service.getPublishedPosts().then((data)=>{res.json({data});
    }).catch ((err)=>{res.json({"message: err" : err})});
 })


 //posts
 //then(data => res.json(data)).catch(err => res.json({"message: err" : err}));
 app.get('/posts', (req, res) => {
    service.getAllposts().then((data)=>{res.json({data});
}).catch ((err)=>{res.json({"message: err" : err})});
})
 

//categories
app.get('/categories', (req, res) => {
     service.getCategories().then(data => res.json(data)).catch(err => res.json({"message: err" : err}));
})

 



//[ no matching route ]
 
app.use(function (req, res)
{
  res.status(404).send('ERROR : Page Not Found');
});


service.initialize().then(()=>
{
    //the promise will reject if any error occurred during the process

        app.listen(HTTP_PORT, onHttpStart);
}).catch((err) => 

{
    console.log('SORRY!! not able to read the file '+ err)

})
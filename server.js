const service = require('./blog-service');
 const express = require('express');
 const path = require('path');
 
 
 const app = express();
 
 const HTTP_PORT = process.env.port || 8080;
 
 app.use(express.static('public'));
 
 app.get('/', (req, res) => {
     res.redirect('/about');
 })
 
 app.get('/about', (req, res) => {
     res.sendFile(path.join(__dirname, 'views/about.html'));
 })
 
 app.get('/blog', (req, res) => {
     service.getPublishedPosts().then(data => res.json(data)).catch(err => res.json({"message: err" : err}));
 })
 
 app.get('/posts', (req, res) => {
     service.getAllPosts().then(data => res.json(data)).catch(err => res.json({"message: err" : err}));
 })
 
 app.get('/categories', (req, res) => {
     service.getCategories().then(data => res.json(data)).catch(err => res.json({"message: err" : err}));
 })
 
 app.use(function (req, res) {
  res.status(404).send('ERROR : Page Not Found');
});


 app.listen(HTTP_PORT, () => {
     service.initialize()
     .then(function () {
       app.listen(HTTP_PORT, onHTTPStart);
     })
     .catch(function (err) {
       console.log('SORRY!! not able to read the file ' + err);
     });
 })
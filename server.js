const express = require('express');
const md5 = require('md5');
const fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
 
const filesDir = "/home/runner/pasty/files/";

const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/www/:file', (req, res) => {
  res.sendFile(req.params.file, {root: "./www"});
});

app.get('/', (req, res) => {
  res.sendFile("index.html", {root: "./www"})
});

app.get('/:id', (req, res) => {
  var filename = path.join(filesDir, req.params.id);
  if (filename.indexOf(filesDir) !== 0) {
    res.send('trying to sneak out of the web root?');
  }else{
    if(fs.existsSync(filename)){
      res.sendFile("view.html", {root: "./www"})
    }else{
      res.sendFile("404.html", {root: "./www"});
    }
  }
});

app.get('/:id/raw', (req, res) => {
  res.header();
  res.sendFile(req.params.id, {root: filesDir, headers:{"Content-Type": "text/plain"}}, (err) => {
    if(err){
      res.send(notFoundContent)
    }
  })
});

app.post('/new', (req, res) => {
  if(req.body.paste){
    fs.writeFile(filesDir + md5(req.body.paste) + req.body.fname, req.body.paste, (err) => {
      console.error(err);
    });
    res.redirect('/' + md5(req.body.paste) + req.body.fname);
  }
});

app.listen(3000, () => {
  console.log('Pasty server started.');
});
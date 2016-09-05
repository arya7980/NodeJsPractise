var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require("fs")
var multer = require('multer')


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false})

app.use(express.static('public'))
//app.use(multer({dest:'/temp/'}))

//default
app.get('/', function(req, res){
  res.send('Hello, Azwa!')
})

//yo
app.get('/yo', function(req, res){
  res.send('YO!')
})

// This responds a POST request for the homepage
app.post('/', function(req, res){
  console.log("Got a POST request for the homepage")
  res.send('Hello POST')
})

// This responds a GET request for the /list_user page.
app.get('/listUsers', function(req, res){
  console.log('Got a GET request for /listUsers')
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function(err, data){
    console.log( data )
    res.send(data)
  })

})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function(req, res){
  console.log("Got a GET request for /list_user");
  res.send('Hello DELETE')
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res){
  console.log(' Got a GET request for /ab*cd')
  res.send('Page pattern match')
})

//handle get request ==> index_get.html
app.get('/index_get.html', function (req, res){
  res.sendFile(__dirname + "/" + "index_get.html")
})

app.get('/process_get', function(req, res){
  //Prepare output in JSON format
  response = {
    first_name:req.query.first_name,
    last_name:req.query.last_name
  }
  console.log(response)
  res.end(JSON.stringify(response))
})

//handel post request ==> index_post.html
app.get('/index_post.html', function (req, res){
  res.sendFile(__dirname + "/" + "index_post.html")
})

app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

//to handle upload file
app.get('/upload.html', function (req, res){
    res.sendFile( __dirname + "/" + "upload.html")
})
app.post('/file_upload', function(req, res){
  //console.log(req.files.file.name)
  //console.log(req.files.file.path)
  //console.log(req.files.file.type)

  var file = __dirname + "/" + req.files.file.name
  fs.readFile(req.files.file.path, function(err, data){
    fs.writeFile(file, data, function (err){
      if(err){
          console.log(err)
      }else{
          response = {
              message:'File uploaded succesfully',
              filename:req.files.file.name
          }
      }
      console.log(response)
    })
  })
})

//add data to users.JSON
var user = {
  "user4" : {
    "name" : "Azwa",
    "password" : "password4",
    "profession" : "doctor",
    "id" : 4
  }
}

app.get('/addUser', function(req, res){
  //first read existing users.
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data){
    data = JSON.parse( data )
    data["user4"] = user["user4"]
    console.log( data )
    res.end( JSON.stringify(data))
  })
})

//API which will be called using user ID
app.get('/:id', function (req, res){
  //first read existing users
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data){
      users = JSON.parse( data )
      var user = users["user" + req.params.id]
      console.log( user )
      res.end (JSON.stringify(user))
  })
})

//delete user id = 2
var id = 2
app.get('/deleteUser', function (req, res){
  // first read existing users
  fs.readFile( __dirname + "/" + "users.json" + 'utf8', function (err, data){
    data = JSON.parse( data )
    delete data["user" + 2]
    console.log( data )
    res.end( JSON.stringify(data))
  })
})


//make server running
var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:' + server.address().port)
})

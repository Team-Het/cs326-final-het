// Sample Placeholder Template Code From Web
// Will be changed to be adapted to our project later

const db = require('./database.js');

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('project'))

server.get('/', (req, res) => {
  // res.send('Hello World!')
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });
})

app.get('/user/:id', (req, res) => {
  console.log(req.params);
  res.send(db.getUser(req.params));
})

app.get('/user/allusers', (req, res) => {
  res.send(db.getAllUsers());
})

app.post('/user/update/:id', (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.send(db.updateUser(req.body, req.params));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
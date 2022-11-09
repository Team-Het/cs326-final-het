const db = require('./database.js');

var express = require('express');
var app = express();
const port = process.env.PORT || 3000

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(express.static('project_code'))

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/user/view/:id', (req, res) => {
	console.log(req.params);
	res.send(db.getUser(req.params));
})

app.post('/user/update/:id', (req, res) => {
	res.send(db.updateUser());
})

app.post('/login', (req, res) => {
	res.send(db.login(req));
})

app.post('/item/create', (req, res) => {
	console.log(req.body);
	res.send(db.createItem(req));
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

//Add more api
app.post('/logout', (req, res) => {
	res.send(db.logout(req));
})

app.post('/user/create', (req, res) => {
	console.log(req.body);
	res.send(db.createUser(req));
})

app.post('/user/view/delete/:id', (req, res) => {
	res.send(db.deleteUser(req));
})

app.get('/user/view/getall', (req, res) => {
	console.log(req.params);
	res.send(db.getUser(req.params));
})

app.post('/item/delete/:id', (req, res) => {
	res.send(db.deleteItem(req));
})

app.post('/item/update/:id', (req, res) => {
	res.send(db.updateItem());
})

app.get('/item/view/:id', (req, res) => {
	console.log(req.params);
	res.send(db.getItem(req.params));
})

app.get('/user/getall', (req, res) => {
	console.log(req.params);
	res.send(db.getAllItem(req.params));
})
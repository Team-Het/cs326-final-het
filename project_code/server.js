const db = require('./database.js');

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('project_code'))

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/user/:id', (req, res) => {
	console.log(req.params);
	res.send(db.getUser(req.params));
})

app.post('/user/update/:id', (req, res) => {
	res.send(db.updateUser());
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const minicrypt = require('./miniCrypt');
const mc = new minicrypt.MiniCrypt();
const uri = process.env.MONGODB_URI;
let db;

async function connectToCluster() {
	try {
		const mongoClient = new MongoClient(uri);
		console.log('Connecting to MongoDB Atlas cluster...');
		await mongoClient.connect();
		console.log('Successfully connected to MongoDB Atlas!');
		db = mongoClient.db();
		console.log('Successfully connected to LostAndFound DB!');
		return db;
	} catch (error) {
		console.error('Connection to MongoDB Atlas failed!', error);
		process.exit();
	}
}

async function testData(req, res) {
	const findResult = await db.collection('User').find().toArray();
	res.send({ findResult });
}

async function getUser(req, res) {
	try {
		console.log('inside getUser');
		console.log(req.params);
		if (req.params.id === 'getall') {
			console.log('inside getUser many');
			const results = await db.collection('User').find().toArray();
			res.send({ results });
			// const cursor = await db.collection('User').find();
			// const results = await cursor.toArray();
			// return {results}
			// res.send(results.findResult);
		} else {
			console.log('inside getUser 1');
			const cursor = await db.collection('User').findOne({ username: req.params.id });
			const user = await cursor;
			res.send(user);
		}
	} catch (error) {
		res.send({
			"status": 'error',
		});
	}
}

async function updateUser(req, res) {
	console.log('inside updateUser');
	try {
		const filter = { username: req.body.username };
		const options = { upsert: true };
		let updateDoc = {};
		if (req.body.password) {
			console.log("changing password");
			const [salt, hash] = mc.hash(req.body.password);
			updateDoc = {
				$set: {
					salt: salt,
					hash: hash,
				},
			};
			await db.collection('User').updateOne(filter, updateDoc, options);
		}
		if (req.body.email) {
			console.log("changing email");
			updateDoc = {
				$set: {
					email: req.body.email,
				},
			};
			await db.collection('User').updateOne(filter, updateDoc, options);
		}
		res.send({
			"status": "success",
		});
	} catch (error) {
		res.send({
			"status": 'error',
		});
	}
}

async function createUser(req, res) {
	console.log('inside createUser');
	try {
		const cursor = await db.collection('User').findOne({ username: req.body.username });
		const user = await cursor;
		console.log(user);
		if(user){
			res.send({
				"status": 'failed',
				"reason": 'user exists'
			});
			return;
		}
		const [salt, hash] = mc.hash(req.body.password);
		delete req.body.password;
		req.body.salt = salt;
		req.body.hash = hash;
		await db.collection('User').insertOne(req.body);
		console.log('after createUser');
		res.send({
			"status": "success",
		});
	} catch (error) {
		res.send({
			"status": 'error',
		});
	}
}

async function deleteUser(req, res) {
	console.log('inside deleteUser');
	try {
		const query = { username: req.body.username };
		await db.collection('User').deleteOne(query);
		console.log('after deleteUser');
		res.send({
			"status": "success",
		});
	} catch (error) {
		res.send({
			"status": 'error',
		});
	}
}

// to do
// https://www.bezkoder.com/node-js-upload-store-images-mongodb/
function uploadItemImage(req, res) {
	return {
		"status": 'success',
	};
}

async function login(req, res) {
	console.log(req.body);
	const cursor = (await db).collection('User').findOne({ username: req.body.username });
	const user = await cursor;
	if(user){
		res.send({
			"status": 'success',
			"email" : user.email
		});
	}
}

function logout(req, res) {
	console.log(req.body);
	return {
		"status": 'success',
	};
}

async function createItem(req, res) {
	console.log('inside createItem');
	try {
		await db.collection('Items').insertOne(req.body);
		console.log('after insert');
		res.send({
			"status": "success",
		});
	} catch (error) {
		res.send({
			"status": 'error',
		});
	}
}

async function updateItem(req, res) {
	console.log('inside updateItem');
	try {
		const filter = { username: req.body.username, item_name: req.body.item_name };
		const options = { upsert: true };
		const updateDoc = {
			$set: {
				item_desc: req.body.item_desc,
				image: req.body.image,
				address: req.body.address,
				is_found: req.body.is_found,
				lost_date: req.body.lost_date,
				time_lost: req.body.time_lost,
				found_date: req.body.found_date,
				category: req.body.category,
				color: req.body.color,
				brand: req.body.brand,
				additional: req.body.additional,
			},
		};
		await db.collection('Items').updateOne(filter, updateDoc, options);
		res.send({
			"status": "success",
		});
	} catch (error) {
		res.send({
			"status": 'error',
		});
	}
}

async function deleteItem(req, res) {
	console.log('inside deleteItem');
	try {
		const query = { item_name: req.body.item_name, username: req.body.username };
		await db.collection('Items').deleteOne(query);
		console.log('after deleteItem');
		res.send({
			"status": "success",
		});
	} catch (error) {
		res.send({
			"status": 'error',
		});
	}
}

async function getItem(req, res) {
	console.log(req.params)
	if (req.params.id === 'getall') {
		const results = await db.collection('Items').find().toArray();
		res.send({ results });
	} else {
		const item = await db.collection('Items').findOne({ item_id: req.params.id });
		res.send({ item });
	}
}

module.exports = {
	getUser,
	updateUser,
	createUser,
	deleteUser,
	login,
	createItem,
	uploadItemImage,
	getItem,
	updateItem,
	deleteItem,
	testData,
	connectToCluster,
	logout,
}
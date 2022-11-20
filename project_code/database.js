const { faker } = require('@faker-js/faker');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const uri = process.env.MONGODB_URI;
let db

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

async function testData(req,res) {
	const findResult = await db.collection('User').find().toArray();
	res.send({findResult});
}

async function getUser(req,res) {
	console.log(req.params)
	if (req.params.id === 'getall') {
		const cursor = await db.collection('User').find();
		const results = await cursor.toArray();
		res.send(results.findResult);
	} else {
		const cursor = await db.collection('User').findOne({ username: req.params.id });
		const user = await cursor;
		res.send(user);
	}
}

function updateUser(req,res) {
	return {
		"status": 'success',
	};
}

function createUser(req,res) {
	return {
		"status": 'success',
	};
}

function deleteUser(req,res) {
	return {
		"status": 'success',
	};
}

function uploadItemImage(req,res) {
	return {
		"status": 'success',
	};
}

function login(req,res){
	console.log(req.body);
	return {
		"status": 'success',
	};
}

function logout(req,res){
	console.log(req.body);
	return {
		"status": 'success',
	};
}

async function createItem(req,res){
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

function updateItem(req,res){
	// console.log(req);
	return {
		"status": "success",
	};
}

function deleteItem(req,res){
	// console.log(req);
	return {
		"status": 'success',
	};
}

async function getItem(req,res) {
	console.log(req.params)
	if (req.params.id === 'getall') {
		const results = await db.collection('Items').find().toArray();
		res.send({results});
	} else {
		const item = await db.collection('Items').findOne({ item_id: req.params.id });
		res.send({item});
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
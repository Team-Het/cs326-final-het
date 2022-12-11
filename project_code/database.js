const { MongoClient } = require('mongodb');
const GridFSBucket = require("mongodb").GridFSBucket;
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs');
const mime = require('mime');
require('dotenv').config();
const minicrypt = require('./miniCrypt');
const { request } = require('http');
const mc = new minicrypt.MiniCrypt();
const uri = process.env.MONGODB_URI;
let db;
let mongoClient;

async function connectToCluster() {
	try {
		mongoClient = new MongoClient(uri);
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
		if (user) {
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

async function uploadItemImage(req, res) {
	console.log('filename = ' + req.files.filename);
	console.log('metadata = ' + req.body.metadata);
	try {
		if (req.files == undefined) {
			return res.send({
				message: "You must select a file.",
			});
		}
		const bucket = new GridFSBucket(db);
		const filename = req.files.filename;
		const metadata = JSON.parse(req.body.metadata);
		console.log('username = ' + metadata.username + ', item_name = ' + metadata.item_name);
		await filename.mv('./tempFiles/' + filename.name)
		await fs.createReadStream('./tempFiles/' + filename.name).
			pipe(uploadStream = bucket.openUploadStream(filename.name, {
				chunkSizeBytes: 1048576,
				metadata: { username: metadata.username, item_name: metadata.item_name }
			})
			).on('error', function (error) {
				console.log(error)
			}).
			on('finish', async function () {
				console.log('Done');
				console.log('fs.files._id:' + uploadStream.id)
				const filter = { username: metadata.username, item_name: metadata.item_name };
				const options = { upsert: true };
				const updateDoc = {
					$set: {
						image: req.protocol + '://' + req.get('host') + '/item/download/' + uploadStream.id,
					},
				};
				await db.collection('Items').updateOne(filter, updateDoc, options);
				return res.send({
					status: "success",
					image: req.protocol + '://' + req.get('host') + '/item/download/' + uploadStream.id,
				});
			});
		console.log(req.files);
		// fs.unlink('./tempFiles/' + filename.name, (err) => {
		// if (err) throw err;
		// console.log(filename.name + ' was deleted');
		// });

	} catch (error) {
		console.log(error);

		return res.send({
			message: "Error when trying upload image: ${error}",
		});
	}
}

async function downloadImage(req, res) {
	try {
		const bucket = new GridFSBucket(db);
		console.log(req.params);
		const cursor = await db.collection('fs.files').findOne({
			_id: ObjectId(req.params.name),
		});
		const item = await cursor;
		console.log(item);
		const mimetype = mime.lookup(item.filename);
		res.setHeader('Content-disposition', 'inline; filename=' + item.filename);
		res.setHeader('Content-type', mimetype);
		let downloadStream = bucket.openDownloadStream(item._id);
		downloadStream.on("data", function (data) {
			return res.status(200).write(data);
		});

		downloadStream.on("error", function (err) {
			return res.status(404).send({ message: "Cannot download the Image!" });
		});

		downloadStream.on("end", () => {
			return res.end();
		});
	} catch (error) {
		return res.status(500).send({
			message: error.message,
		});
	}
}

async function login(req, res) {
	console.log(req.body);
	const cursor = (await db).collection('User').findOne({ username: req.body.username });
	const user = await cursor;
	if (user) {
		res.send({
			"status": 'success',
			"email": user.email
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
				// image: req.body.image,
				address: req.body.address,
				is_found: req.body.is_found,
				date_lost: req.body.date_lost,
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
		if (req.body.delete_image === 'y') {
			const bucket = new GridFSBucket(db);
			const image = await db.collection('Items').findOne(query);
			const obj_id = image.substring(image.lastIndexOf('/') + 1, image.length);
			console.log(obj_id);
			bucket.delete(ObjectId(obj_id));
			await db.collection('Items').updateOne(query, { upsert: true }, { $set: { image: '', }, });
		} else {
			await db.collection('Items').deleteOne(query);
		}
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

async function createComment(req, res) {
	console.log(req.body);
	try {
		if ("comment" in req.body) {
			req.body.comment.push({
				"user": req.body.username,
				"comment": req.body.newComment
			});
		} else {
			req.body.comment = [...{
				"user": req.body.username,
				"comment": req.body.newComment
			}];
		}
		delete req.body.newComment;
		const filter = { username: req.body.username, item_name: req.body.item_name };
		const options = { upsert: true };
		const updateDoc = {
			$set: {
				comment: req.body.comment
			},
		};
		await db.collection('Items').updateOne(filter, options, updateDoc);
		res.send({
			"status": "success",
		});
	} catch (error) {
		res.send({
			"status": 'error',
		});
	}
}

async function getComment(req, res) {

}

module.exports = {
	getUser,
	updateUser,
	createUser,
	deleteUser,
	login,
	createItem,
	uploadItemImage,
	downloadImage,
	getItem,
	updateItem,
	deleteItem,
	testData,
	connectToCluster,
	logout,
	createComment,
	getComment
}
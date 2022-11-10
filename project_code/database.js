// Sample Placeholder Template Code
// Will be changed to be adapted to our project later

const { faker } = require('@faker-js/faker');

function getUser(params) {
	console.log(params)
	if (params.id === 'getall') {
		return [
			{
				"id": faker.id,
				"user_name": faker.name.firstName(),
				"email": faker.internet.email()
			},
			{
				"id": faker.id,
				"user_name": faker.name.firstName(),
				"email": faker.internet.email()
			},
			{
				"id": faker.id,
				"user_name": faker.name.firstName(),
				"email": faker.internet.email()
			},
			{
				"id": faker.id,
				"user_name": faker.name.firstName(),
				"email": faker.internet.email()
			}
		]
	} else if (params.id === 'create') {
		return {
			"status": 'success',
		}
	} else if (params.id === 'delete') {
		return {
			"status": 'success',
		}
	} else {
		return {
			"id": params.id,
			"user_name": faker.name.firstName(),
			"email": faker.internet.email()
		}
	}
}

function updateUser() {
	return {
		"status": 'success',
	};
}

function login(req){
	console.log(req);

}

function createItem(req){
	// console.log(req);
	return {
		"status": 'success',
	};
}
//Add functions
function getItem(params) {
	console.log(params)
	if (params.id === 'getall') {
		return [
			{
				"user_id": faker.id,
				"item_id": faker.id,
				"item_name": faker.commerce.productName(),
				"item_desc": faker.commerce.productDescription(),
				"image": faker.image.image(),
				"address": faker.address.streetAddress(),
				"is_found": 'n',
				"lost_date": faker.date.past(),
				"time_lost": faker.date.recent(),
				"found_date": faker.date.recent(),
				"category": faker.commerce.productName(),
				"color": faker.color(),
				"brand": faker.company(),
				"additional": faker.random()
			},
			{
				"user_id": faker.id,
				"item_id": faker.id,
				"item_name": faker.commerce.productName(),
				"item_desc": faker.commerce.productDescription(),
				"image": faker.image.image(),
				"address": faker.address.streetAddress(),
				"is_found": 'n',
				"lost_date": faker.date.past(),
				"time_lost": faker.date.recent(),
				"found_date": faker.date.recent(),
				"category": faker.commerce.productName(),
				"color": faker.color(),
				"brand": faker.company(),
				"additional": faker.random()
			},
			{
				"user_id": faker.id,
				"item_id": faker.id,
				"item_name": faker.commerce.productName(),
				"item_desc": faker.commerce.productDescription(),
				"image": faker.image.image(),
				"address": faker.address.streetAddress(),
				"is_found": 'y',
				"lost_date": faker.date.past(),
				"time_lost": faker.date.recent(),
				"found_date": faker.date.recent(),
				"category": faker.commerce.productName(),
				"color": faker.color(),
				"brand": faker.company(),
				"additional": faker.random()
			},
			{
				"user_id": faker.id,
				"item_id": faker.id,
				"item_name": faker.commerce.productName(),
				"item_desc": faker.commerce.productDescription(),
				"image": faker.image.image(),
				"address": faker.address.streetAddress(),
				"is_found": 'y',
				"lost_date": faker.date.past(),
				"time_lost": faker.date.recent(),
				"found_date": faker.date.recent(),
				"category": faker.commerce.productName(),
				"color": faker.color(),
				"brand": faker.company(),
				"additional": faker.random()
			}
		]
	} else if (params.id === 'create') {
		return {
			"status": 'success',
		}
	} else if (params.id === 'delete') {
		return {
			"status": 'success',
		}
	} else {
		return {
			"user_id": faker.id,
			"item_id": params.id,
			"item_name": faker.commerce.productName(),
			"item_desc": faker.commerce.productDescription(),
			"image": faker.image.image(),
			"address": faker.address.streetAddress(),
			"is_found": 'y',
			"lost_date": faker.date.past(),
			"time_lost": faker.date.recent(),
			"found_date": faker.date.recent(),
			"category": faker.commerce.productName(),
			"color": faker.color(),
			"brand": faker.company(),
			"additional": faker.random()
		}
	}
}

module.exports = {
	getUser,
	updateUser,
	login,
	createItem,
	getItem
}
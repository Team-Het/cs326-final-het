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

function getItem(params) {
	console.log(params)
	if (params.id === 'getall') {
		return [
			{
				"user_id": faker.id,
				"item_id": faker.id,
				"irem_name": faker.commerce.productName(),
				"address": faker.address.streetAddress()
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

module.exports = {
	getUser,
	updateUser,
	login,
	createItem,

}
// Sample Placeholder Template Code
// Will be changed to be adapted to our project later

const { faker } = require('@faker-js/faker');

function getUser(params) {
	console.log(params)
	if (params.id === 'getall') {
		return [
			{
				"id": faker.id,
				"first_name": faker.name.firstName(),
				"last_name": faker.name.lastName(),
				"email": faker.internet.email()
			},
			{
				"id": faker.id,
				"first_name": faker.name.firstName(),
				"last_name": faker.name.lastName(),
				"email": faker.internet.email()
			},
			{
				"id": faker.id,
				"first_name": faker.name.firstName(),
				"last_name": faker.name.lastName(),
				"email": faker.internet.email()
			},
			{
				"id": faker.id,
				"first_name": faker.name.firstName(),
				"last_name": faker.name.lastName(),
				"email": faker.internet.email()
			}
		];
	} else {
		return {
			"id": params.id,
			"first_name": faker.name.firstName(),
			"last_name": faker.name.lastName(),
			"email": faker.internet.email()
		};
	}
}

function updateUser() {
	return {
		"status": 'success',
	};
}

module.exports = {
	getUser,
	updateUser,
}
import { fakeServer } from '../__mocks__/fake-server';
import { userRouter } from './user-router';

import supertest = require('supertest');

jest.mock('./user-controller', () => {
	return {
		userController: {
			getUsers: (req, res, next) => {
				return res.status(200).send('fake message');
			},
			createUser: (req, res, next) => {
				return res.status(200).send('fake message');
			},
		},
	};
});

describe('User Router', () => {
	const path = `/users`;
	userRouter(fakeServer);
	it('/ (GET)', async () => {
		const response = await supertest(fakeServer).get(path).set('Accept', 'application/json');
		expect(response.status).toEqual(200);
	});
	it('/ POST', async () => {
		const response = await supertest(fakeServer).post(path).set('Accept', 'application/json');
		expect(response.status).toEqual(200);
	});
});

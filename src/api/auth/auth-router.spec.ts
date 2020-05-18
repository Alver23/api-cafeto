import { fakeServer } from '../__mocks__/fake-server';
import { authRouter } from './auth-router';

import supertest = require('supertest');

jest.mock('./auth-controller', () => {
	return {
		authController: {
			login: (req, res, next) => {
				return res.status(200).send('fake message');
			},
			loginProvider: (req, res, next) => {
				return res.status(200).send('fake message');
			},
		},
	};
});
describe('Auth Router', () => {
	const path = `/auth`;
	authRouter(fakeServer);
	it('/login (POST)', async () => {
		const response = await supertest(fakeServer).post(`${path}/login`).set('Accept', 'application/json');
		expect(response.status).toEqual(200);
	});
	it('/login-provider POST', async () => {
		const response = await supertest(fakeServer).post(`${path}/login-provider`).set('Accept', 'application/json');
		expect(response.status).toEqual(200);
	});
});

import { fakeServer } from '../__mocks__/fake-server';

import supertest = require('supertest');

import { eventRouter } from './event-router';

jest.mock('../../core/middlewares/protect-routes/protect-routes', () => ({
	protectRoutes: (req, res, next) => next(),
}));

jest.mock('./event-controller', () => {
	const fakeResponse = (res) => res.status(200).send('fake message');
	return {
		eventController: {
			createEvent: (req, res, next) => {
				return fakeResponse(res);
			},
			updateEvent: (req, res, next) => {
				return fakeResponse(res);
			},
			getEvents: (req, res, next) => {
				return fakeResponse(res);
			},
			getEventById: (req, res, next) => {
				return fakeResponse(res);
			},
			deleteEvent: (req, res, next) => {
				return fakeResponse(res);
			},
		},
	};
});

describe('Event Router', () => {
	const path = '/events';
	eventRouter(fakeServer);
	it('/ GET', async () => {
		const response = await supertest(fakeServer).get(path).set('Accept', 'application/json');
		expect(response.status).toEqual(200);
	});

	it('/ GET ONE', async () => {
		const response = await supertest(fakeServer).get(`${path}/1`).set('Accept', 'application/json');
		expect(response.status).toEqual(200);
	});

	it('/ POST', async () => {
		const response = await supertest(fakeServer).post(path).set('Accept', 'application/json');
		expect(response.status).toEqual(200);
	});

	it('/ PUT', async () => {
		const response = await supertest(fakeServer).put(`${path}/1`).set('Accept', 'application/json');
		expect(response.status).toEqual(200);
	});

	it('/ DELETE', async () => {
		const response = await supertest(fakeServer).delete(`${path}/1`).set('Accept', 'application/json');
		expect(response.status).toEqual(200);
	});
});

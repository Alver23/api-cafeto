import { UserController } from './user-controller';

import { userServiceMock } from './services/user-service-mock';

import { mockRequest, mockResponse } from '../__mocks__/fake-request';

jest.mock('./services/user-service', () => jest.fn());

describe('UserController', () => {
	let controller: UserController;

	beforeEach(() => {
		controller = new UserController(userServiceMock);
	});

	describe('getUsers method', () => {
		it('should get an users list', async () => {
			const req = mockRequest({});
			const res = mockResponse();
			const next = jest.fn();
			await controller.getUsers(req, res, next);
			expect(res.json).toHaveBeenCalled();
			expect(next).not.toHaveBeenCalled();
		});

		it('should return an error', async () => {
			const errorMessage: string = 'Network Error';
			jest.spyOn(userServiceMock, 'findAll').mockRejectedValue(new Error(errorMessage));
			const req: any = mockRequest({ contextData: {} });
			const res: any = mockResponse();
			const next: any = jest.fn();
			await controller.getUsers(req, res, next);
			expect(next).toHaveBeenCalled();
			expect(res.json).not.toHaveBeenCalled();
		});
	});

	describe('createUser method', () => {
		const mock = { name: 'fake', email: 'fake@fake.com', password: '123' };
		it('should create an new user', async () => {
			const req = mockRequest({ body: mock });
			const res = mockResponse();
			const next = jest.fn();
			const spy = jest.spyOn(userServiceMock, 'create');
			await controller.createUser(req, res, next);
			expect(spy).toBeCalledWith(mock);
			expect(res.json).toHaveBeenCalled();
			expect(next).not.toHaveBeenCalled();
		});

		it('should get an error when trying to create a user that already exists', async () => {
			const req = mockRequest({ body: mock });
			const res = mockResponse();
			const next = jest.fn();
			jest.spyOn(userServiceMock, 'verifyEmail').mockResolvedValue(mock);
			await controller.createUser(req, res, next);
			expect(next).toHaveBeenCalled();
			expect(res.json).not.toHaveBeenCalled();
		});

		it('should return an error', async () => {
			const errorMessage: string = 'Network Error';
			jest.spyOn(userServiceMock, 'findAll').mockRejectedValue(new Error(errorMessage));
			const req: any = mockRequest({ contextData: {} });
			const res: any = mockResponse();
			const next: any = jest.fn();
			await controller.createUser(req, res, next);
			expect(next).toHaveBeenCalled();
			expect(res.json).not.toHaveBeenCalled();
		});
	});
});

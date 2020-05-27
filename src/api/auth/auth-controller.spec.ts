import { AuthController } from './auth-controller';
import { authServiceMock } from './services/auth-service-mock';
import { userServiceMock } from '../users/services/user-service-mock';

import { mockRequest, mockResponse } from '../__mocks__/fake-request';
import mocks from './mocks.json';

jest.mock('./services/auth-service', () => jest.fn());
jest.mock('../users/services', () => jest.fn());
jest.mock('passport', () => ({
	authenticate: (type, cb) => {
		return (req) => {
			req.login = (user, option, callback) => {
				return callback(null);
			};
			return cb(null, mocks);
		};
	},
}));

jest.mock('./strategies/basic', () => jest.fn());

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(() => {
		controller = new AuthController(authServiceMock, userServiceMock);
	});

	describe('login method', () => {
		it('should authenticate the user', async () => {
			const req = mockRequest({ body: mocks });
			const res = mockResponse();
			const next = jest.fn();
			await controller.login(req, res, next);
			expect(res.json).toHaveBeenCalled();
			expect(next).not.toHaveBeenCalled();
		});
	});

	describe('loginProvider method', () => {
		it('should authenticate the user with a provider', async () => {
			const req = mockRequest({ body: mocks });
			const res = mockResponse();
			const next = jest.fn();
			await controller.loginProvider(req, res, next);
			expect(res.json).toHaveBeenCalled();
			expect(next).not.toHaveBeenCalled();
		});

		it('should return an error', async () => {
			const errorMessage: string = 'Network Error';
			jest.spyOn(userServiceMock, 'findOrCreate').mockRejectedValue(new Error(errorMessage));
			const req: any = mockRequest({});
			const res: any = mockResponse();
			const next: any = jest.fn();
			await controller.loginProvider(req, res, next);
			expect(next).toHaveBeenCalled();
			expect(res.json).not.toHaveBeenCalled();
		});
	});

	describe('refreshToken method', () => {
    it('should the refresh token', async () => {
      const req = mockRequest({ body: {refreshToken: '12'} });
      const res = mockResponse();
      const next = jest.fn();
      await controller.refreshToken(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
    it('should return an error', async () => {
      const req: any = mockRequest({});
      const res: any = mockResponse();
      const next: any = jest.fn();
      await controller.refreshToken(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});

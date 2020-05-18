import { userService } from './user-service';
import { UserTransformer } from '../models/user-transformer';

jest.mock('../models/user', () => {
	const mock = { email: 'fake', name: 'fake' };
	return {
		User: {
			findAll: () => [{ ...mock, id: 1 }],
			create: () => ({ ...mock, password: 'fake' }),
			findOne: () => ({ ...mock, id: 1, password: 'fake' }),
			verifyEmail: () => {},
			findOrCreate: () => [{ ...mock, id: 1 }],
		},
	};
});
describe('UserService', () => {
	const expectedNameAndEmail = () => ({
		name: expect.any(String),
		email: expect.any(String),
	});
	describe('findAll method', () => {
		it('should get an users list', () => {
			return userService.findAll().then((response) => {
				expect(response).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							id: expect.any(Number),
							...expectedNameAndEmail(),
						}),
					]),
				);
			});
		});
	});

	describe('create method', () => {
		it('should get an new user', () => {
			return userService.create({ email: 'fake', name: 'fake', password: 'fake' }).then((response) => {
				expect(response).toBeInstanceOf(UserTransformer);
			});
		});
	});

	describe('getUser mehod', () => {
		it('should get an user', () => {
			return userService.getUser({ email: 'fake' }).then((response) => {
				expect(response).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						password: expect.any(String),
						...expectedNameAndEmail(),
					}),
				);
			});
		});
	});

	describe('verifyEmail method', () => {
		it('should get an user if exist', () => {
			return userService.verifyEmail('fake').then((response) => {
				expect(response).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						password: expect.any(String),
						...expectedNameAndEmail(),
					}),
				);
			});
		});
	});

	describe('findOrCreate method', () => {
		it('should get an user', () => {
			return userService.findOrCreate({ email: 'fake', name: 'fake', password: 'fake' }).then((response) => {
				expect(response).toBeInstanceOf(UserTransformer);
			});
		});
	});
});

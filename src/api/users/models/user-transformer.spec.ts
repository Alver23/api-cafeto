import { UserTransformer } from './user-transformer';

describe('UserTransformer', () => {
	it('should get an user model', () => {
		expect(new UserTransformer({ id: 1, email: 'fake', name: 'fake' })).toEqual(
			expect.objectContaining({
				id: expect.any(Number),
				name: expect.any(String),
				email: expect.any(String),
			}),
		);
	});
});

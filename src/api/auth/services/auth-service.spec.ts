import { authService } from './auth-service';

import mocks from './mocks.json';

describe('AuthService', () => {
	it('should get an token', () => {
		expect(authService.createToken(mocks)).toEqual(expect.any(String));
	});
});

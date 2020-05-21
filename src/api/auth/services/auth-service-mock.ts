import { AuthService } from './auth-service-interface';

export class AuthServiceMock implements AuthService {
	createToken(): string {
		return '1234dede';
	}
}

export const authServiceMock = new AuthServiceMock();

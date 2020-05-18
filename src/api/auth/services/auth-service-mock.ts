import { AuthService } from './auth-service-interface';
import { UserViewModel } from '../../users/models/user';

export class AuthServiceMock implements AuthService {
	createToken(user: UserViewModel): string {
		return '1234dede';
	}
}

export const authServiceMock = new AuthServiceMock();

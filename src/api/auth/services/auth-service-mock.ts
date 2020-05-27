import { AuthService } from './auth-service-interface';

export class AuthServiceMock implements AuthService {
	createToken(): string {
		return '1234dede';
	}

	ramdonToken(): string {
	  return '1234';
  }

  generateRefreshToken(user): any {
  }

  refreshToken() {
	  return {
	    token: 'token',
    }
  }
}

export const authServiceMock = new AuthServiceMock();

import { sign } from 'jsonwebtoken';
import { UserViewModel } from '../../users/models/user';

import { config } from '../../../config';
import { AuthService } from './auth-service-interface';

export class CAuthService implements AuthService {
	public createToken(user: UserViewModel): string {
		const {
			jwt: { secret, expires },
		} = config;
		const { id, name, email } = user;
		const payload = {
			sub: id,
			name,
			email,
		};
		return sign(payload, secret, { expiresIn: expires });
	}
}

export const authService = new CAuthService();

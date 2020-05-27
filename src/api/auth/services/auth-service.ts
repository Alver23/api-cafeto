import { unauthorized } from '@hapi/boom';
import { sign } from 'jsonwebtoken';
import { uid } from 'rand-token';
import { UserViewModel } from '../../users/models/user';
import { config } from '../../../config';
import { AuthService } from './auth-service-interface';
import { HttpMessages } from '../../../core/messages/http-messages';

import { RedisService } from '../../../core/redis/redis-service';

export class CAuthService implements AuthService {
	private readonly config;

	constructor(private readonly redisService, configuration) {
		({ jwt: this.config } = configuration);
	}

	public createToken(user: UserViewModel): string {
		const { secret, expires } = this.config;
		const { id, name, email } = user;
		const payload = {
			sub: id,
			name,
			email,
		};
		return sign(payload, secret, { expiresIn: expires });
	}

	public ramdonToken(): string {
		return uid(256);
	}

	generateRefreshToken(user): any {
		const { refresTokenExpires } = this.config;
		const token = this.ramdonToken();
		this.redisService.setDataInCache(token, user, refresTokenExpires);
		return token;
	}

	async refreshToken(token) {
		const response = await this.redisService.clientAsync.getAsync(token);
		const user = JSON.parse(response);
		if (!user) {
			throw unauthorized(HttpMessages.UNAUTHORIZED);
		}
		const newToken = this.createToken(user);
		const refreshToken = this.generateRefreshToken(user);
		return { user, refreshToken, token: newToken };
	}
}

export const authService = new CAuthService(RedisService.getInstance(), config);

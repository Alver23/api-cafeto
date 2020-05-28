import * as passport from 'passport';
import { CREATED } from 'http-status-codes';
import { unauthorized } from '@hapi/boom';
import { NextFunction, Response, Request } from 'express';

import './strategies/basic';
import { UserViewModel } from '../users/models/user';
import { userService } from '../users/services';
import { authService } from './services/auth-service';
import { AuthService } from './services/auth-service-interface';

import { setResponse } from '../../utils';
import { UserService } from '../users/services/user-service-interface';
import { HttpMessages } from '../../core/messages/http-messages';

export class AuthController {
	constructor(private readonly authServiceInstance: AuthService, private readonly userServiceInstance: UserService) {}

	public login(req: any, res: Response, next: NextFunction) {
		return passport.authenticate('basic', (error: any, user: UserViewModel) => {
			if (error || !user) {
				return next(unauthorized(HttpMessages.UNAUTHORIZED));
			}

			return req.login(user, { session: false }, (errorLogin: any) => {
				if (errorLogin) {
					return next(errorLogin);
				}

				const token = this.authServiceInstance.createToken(user);
				const refreshToken = this.authServiceInstance.generateRefreshToken(user);
				res.json(
					setResponse({
						data: { user, token, refreshToken },
					}),
				);
			});
		})(req, res, next);
	}

	public async loginProvider(req: any, res: Response, next: NextFunction) {
		try {
			const { body } = req;
			const user = await this.userServiceInstance.findOrCreate(body);
			const token = this.authServiceInstance.createToken(user);
			const refreshToken = this.authServiceInstance.generateRefreshToken(user);
			res.json(
				setResponse({
					data: { user, token, refreshToken },
				}),
			);
		} catch (e) {
			next(e);
		}
	}

	public async refreshToken(req: Request, res: Response, next: NextFunction) {
		try {
			const {
				body: { refreshToken },
			} = req;
			const data = await this.authServiceInstance.refreshToken(refreshToken);
			const response = setResponse({ data: { ...data }, status: CREATED });
			res.status(response.status).json(response);
		} catch (e) {
			next(e);
		}
	}
}

export const authController = new AuthController(authService, userService);

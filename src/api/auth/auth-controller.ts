import * as passport from 'passport';
import { unauthorized } from '@hapi/boom';
import { NextFunction, Response } from 'express';

import './strategies/basic';
import { UserViewModel } from '../users/models/user';
import { userService } from '../users/services/user-service';
import { authService } from './services/auth-service';
import { AuthService } from './services/auth-service-interface';

import { setResponse } from '../../utils';
import { UserService } from '../users/services/user-service-interface';

export class AuthController {
	constructor(private readonly authServiceInstance: AuthService, private readonly userServiceInstance: UserService) {}

	public login(req: any, res: Response, next: NextFunction) {
		return passport.authenticate('basic', (error: any, user: UserViewModel) => {
			if (error || !user) {
				return next(unauthorized());
			}

			return req.login(user, { session: false }, (errorLogin: any) => {
				if (errorLogin) {
					return next(errorLogin);
				}

				const token = this.authServiceInstance.createToken(user);
				res.json(
					setResponse({
						data: { user, token },
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
			res.json(
				setResponse({
					data: { user, token },
				}),
			);
		} catch (e) {
			next(e);
		}
	}
}

export const authController = new AuthController(authService, userService);

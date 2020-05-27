import * as passport from 'passport';
import { unauthorized } from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';

import '../../../api/auth/strategies/jwt';
import { UserViewModel } from '../../../api/users/models/user';
import { HttpMessages } from '../../messages/http-messages';

export const protectRoutes = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('jwt', (error: any, user: UserViewModel | undefined) => {
		if (error || !user) {
			return next(unauthorized(HttpMessages.UNAUTHORIZED));
		}

		req.login(user, { session: false }, (errorLogin) => {
			if (errorLogin) {
				return next(errorLogin);
			}
			next();
		});
	})(req, res, next);
};

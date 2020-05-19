import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { unauthorized } from '@hapi/boom';

import { userService } from '../../users/services';

import { config } from '../../../config';
import { UserTransformer } from '../../users/models/user-transformer';

passport.use(
	new Strategy(
		{
			secretOrKey: config.jwt.secret,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		},
		async (payload, cb) => {
			try {
				const { email } = payload;
				const user = await userService.getUser({ email });

				if (!user) {
					return cb(unauthorized());
				}
				const data = new UserTransformer(user);
				return cb(null, { ...data });
			} catch (error) {
				cb(error);
			}
		},
	),
);

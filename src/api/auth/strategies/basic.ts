import * as passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { unauthorized } from '@hapi/boom';
import { compare } from 'bcrypt';

import { HttpMessages } from '../../../core/messages/http-messages';
import { userService } from '../../users/services/user-service';

passport.use(
	new BasicStrategy(async (email: string, password: string, cb: Function) => {
		try {
			const { id, name, email: userEmail, password: userPassword } = await userService.getUser({ email });
			if (!userEmail) {
				return cb(unauthorized(HttpMessages.UNAUTHORIZED));
			}

			if (!(await compare(password, userPassword))) {
				return cb(unauthorized(HttpMessages.UNAUTHORIZED));
			}

			const data = {
				id,
				name,
				email: userEmail,
			};
			return cb(null, data);
		} catch (error) {
			return cb(error);
		}
	}),
);

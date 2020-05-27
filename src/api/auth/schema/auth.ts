import * as Joi from '@hapi/joi';

export const authSchema = {
	refreshToken: Joi.string().required(),
};

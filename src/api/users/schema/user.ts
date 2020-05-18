import * as Joi from '@hapi/joi';

export const userSchema = {
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
};

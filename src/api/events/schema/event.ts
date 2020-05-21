import * as Joi from '@hapi/joi';

export const eventSchema = {
	title: Joi.string().required(),
	description: Joi.string(),
	address: Joi.string(),
	userId: Joi.number(),
	latitude: Joi.number().required(),
	longitude: Joi.number().required(),
};

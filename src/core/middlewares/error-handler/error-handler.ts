import { NextFunction, Request, Response } from 'express';
import * as boom from '@hapi/boom';

import { config } from '../../../config';

const debug = require('debug')(`${config.appName}:error-handler`);

export const withErrorStack = (error: any, stack: any): any => {
	if (config.env) {
		return { ...error, stack };
	}
	return { error };
};

export const logErrors = (error: any, req: Request, res: Response, next: NextFunction): void => {
	debug(error);
	next(error);
};

export const wrapError = (error: any, req: Request, res: Response, next: NextFunction): void => {
	if (!error.isBoom) {
		next(boom.badImplementation(error));
	}
	next(error);
};

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
	const {
		output: { statusCode, payload },
		stack,
	} = error;
	res.status(statusCode).json(withErrorStack(payload, stack));
};

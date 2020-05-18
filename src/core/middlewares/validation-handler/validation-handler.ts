import { Request, Response, NextFunction } from 'express';
import { badRequest } from '@hapi/boom';
import { object } from '@hapi/joi';

const validate = (data: any, schema: any): any => {
	const { error } = object(schema).validate(data);
	return error;
};

export const validationHandler = (schema, check = 'body') => {
	return (req: Request, res: Response, next: NextFunction) => {
		const error = validate(req[check], schema);
		let errorMessage;
		if (error) {
			errorMessage = badRequest(error);
		}
		next(errorMessage);
	};
};

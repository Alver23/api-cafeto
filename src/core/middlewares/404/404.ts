import { Request, Response } from 'express';
import * as boom from '@hapi/boom';

export const fourOFour = (req: Request, res: Response) => {
	const {
		output: { statusCode, payload },
	} = boom.notFound();
	res.status(statusCode).json(payload);
};

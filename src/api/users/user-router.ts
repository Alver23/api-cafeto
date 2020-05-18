import { NextFunction, Response, Request, Router, Application } from 'express';

import { validationHandler } from '../../core/middlewares';
import { userSchema } from './schema/user';

import { userController } from './user-controller';

export const userRouter = (app: Application) => {
	const basePath = '/users';
	const router = Router();
	app.use(basePath, router);
	router.get('/', (req: Request, res: Response, next: NextFunction) => userController.getUsers(req, res, next));
	router.post('/', validationHandler(userSchema), (req: Request, res: Response, next: NextFunction) =>
		userController.createUser(req, res, next),
	);
};

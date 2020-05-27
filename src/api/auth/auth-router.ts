import { NextFunction, Response, Request, Router, Application } from 'express';

import { authController } from './auth-controller';
import { validationHandler } from '../../core/middlewares';
import { userSchema } from '../users/schema/user';
import { authSchema } from './schema/auth';

export const authRouter = (app: Application) => {
	const basePath = '/auth';
	const router = Router();
	app.use(basePath, router);
	router.post('/login', (req: Request, res: Response, next: NextFunction) => authController.login(req, res, next));
	router.post('/login-provider', validationHandler(userSchema), (req: Request, res: Response, next: NextFunction) =>
		authController.loginProvider(req, res, next),
	);
	router.post('/token', validationHandler(authSchema), (req: Request, res: Response, next: NextFunction) =>
		authController.refreshToken(req, res, next),
	);
};

import { CREATED } from 'http-status-codes';
import { badRequest } from '@hapi/boom';
import { NextFunction, Response, Request } from 'express';

import { userService } from './services/user-service';
import { UserService } from './services/user-service-interface';

import { setResponse } from '../../utils';
import { HttpMessages } from '../../core/messages/http-messages';

export class UserController {
	constructor(private readonly userServiceInstance: UserService) {}

	public async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await this.userServiceInstance.findAll();
			res.json(
				setResponse({
					data: response,
					message: HttpMessages.LISTS,
				}),
			);
		} catch (error) {
			next(error);
		}
	}

	public async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { body } = req;
			if (await this.userServiceInstance.verifyEmail(body.email)) {
				return next(badRequest('email already in use'));
			}
			const response = await this.userServiceInstance.create(body);
			res.status(CREATED).json(
				setResponse({
					data: response,
					status: CREATED,
					message: HttpMessages.CREATED,
				}),
			);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController(userService);

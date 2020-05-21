import { Request, Response, NextFunction } from 'express';
import { NOT_FOUND, OK, NO_CONTENT } from 'http-status-codes';
import { EventService } from './services/event-service-interface';
import { eventService } from './services/event-service';
import { setResponse } from '../../utils';

import { HttpMessages } from '../../core/messages/http-messages';

export class EventController {
	constructor(private readonly eventServiceInstance: EventService) {}

	private responseDataByType(type: number, message?: string): { status: number; message?: string } {
		return {
			0: {
				status: NOT_FOUND,
			},
			1: {
				status: NO_CONTENT,
				message,
			},
		}[type];
	}

	public async createEvent(req: any, res: Response, next: NextFunction) {
		try {
			const imageUrl = req.cloudinaryFileUrl;
			let { body } = req;
			const {
				user: { id: userId },
			} = req;
			body = { ...body, userId };

			if (imageUrl) {
				body = {
					...body,
					imageUrl,
				};
			}
			const data = await this.eventServiceInstance.create(body);
			res.json(setResponse({ message: HttpMessages.CREATED, data }));
		} catch (error) {
			next(error);
		}
	}

	public async updateEvent(req: any, res: Response, next: NextFunction) {
		try {
			const imageUrl = req.cloudinaryFileUrl;
			let { body } = req;
			const {
				params: { id },
			} = req;
			const {
				user: { id: userId },
			} = req;
			body = { ...body, userId };

			if (imageUrl) {
				body = {
					...body,
					imageUrl,
				};
			}

			const [data] = await this.eventServiceInstance.update(id, body);
			const response = this.responseDataByType(data, HttpMessages.UPDATED);
			res.status(response.status).json(setResponse(response));
		} catch (error) {
			next(error);
		}
	}

	public async getEvents(req: any, res: Response, next: NextFunction) {
		try {
			const {
				user: { id: userId },
			} = req;
			const data = await this.eventServiceInstance.findAll({ userId });
			res.json(
				setResponse({
					data,
					message: HttpMessages.LISTS,
				}),
			);
		} catch (error) {
			next(error);
		}
	}

	public async getEventById(req: Request, res: Response, next: NextFunction) {
		try {
			const {
				params: { id },
			} = req;
			const data = await this.eventServiceInstance.findOne({ query: { id } });
			const status = data ? OK : NOT_FOUND;
			res.status(status).json(setResponse({ data, status }));
		} catch (error) {
			next(error);
		}
	}

	public async deleteEvent(req: Request, res: Response, next: NextFunction) {
		try {
			const {
				params: { id },
			} = req;
			const data = await this.eventServiceInstance.deleteOne(id);
			const response = this.responseDataByType(data);
			res.status(response.status).json(setResponse(response));
		} catch (error) {
			next(error);
		}
	}
}

export const eventController = new EventController(eventService);

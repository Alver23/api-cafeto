import { Request, Response, NextFunction } from 'express';
import { EventService } from './services/event-service-interface';
import { eventService } from './services/event-service';
import { setResponse } from '../../utils';
import { NOT_FOUND, OK, NO_CONTENT } from 'http-status-codes';

import { HttpMessages } from '../../core/messages/http-messages';
import { config } from '../../config';
const {
	staticFiles: { directory, pathUploads },
	domain,
} = config;

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

	private getFilePath(req) {
		const { file } = req;
		let imageUrl;
		if (file) {
			imageUrl = `${domain}/${directory}/${pathUploads}${file.filename}`;
		}
		return imageUrl;
	}

	public async createEvent(req: Request, res: Response, next: NextFunction) {
		try {
			const imageUrl = this.getFilePath(req);
			let { body } = req;
			const user: any = req.user;
			body = { ...body, userId: user.id };

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

	public async updateEvent(req: Request, res: Response, next: NextFunction) {
		try {
			const imageUrl = this.getFilePath(req);
			let { body } = req;
			const {
				params: { id },
			} = req;
			const user: any = req.user;
			body = { ...body, userId: user.id };

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

	public async getEvents(req: Request, res: Response, next: NextFunction) {
		try {
			const user: any = req.user;
			const { id: userId } = user;
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
			const status = !!data ? OK : NOT_FOUND;
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

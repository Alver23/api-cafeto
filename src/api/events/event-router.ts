import { Router, Request, Response, NextFunction, Application } from 'express';

import { eventController } from './event-controller';
import { protectRoutes } from '../../core/middlewares/protect-routes/protect-routes';
import { validationHandler, diskStorage, storageMiddleware } from '../../core/middlewares';
import { eventSchema } from './schema/event';
import { config } from '../../config';
const {
	staticFiles: { pathUploads },
} = config;

export const eventRouter = (app: Application): void => {
	const basePath = '/events';
	const router = Router();
	const storage = diskStorage(pathUploads);
	const upload = storageMiddleware(storage);
	app.use(protectRoutes);
	app.use(basePath, router);
	router.get('/', (req: Request, res: Response, next: NextFunction) => eventController.getEvents(req, res, next));
	router.get('/:id', (req: Request, res: Response, next: NextFunction) => eventController.getEventById(req, res, next));

	router.post(
		'/',
		upload.single('image'),
		validationHandler(eventSchema),
		(req: Request, res: Response, next: NextFunction) => eventController.createEvent(req, res, next),
	);

	router.put('/:id', upload.single('image'), (req: Request, res: Response, next: NextFunction) =>
		eventController.updateEvent(req, res, next),
	);

	router.delete('/:id', (req: Request, res: Response, next: NextFunction) =>
		eventController.deleteEvent(req, res, next),
	);
};

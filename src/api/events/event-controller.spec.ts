// Controllers
import { EventController } from './event-controller';

// Mocks Service
import { eventServiceMock } from './services/event-service-mock';

// Mocks Utils
import { mockRequest, mockResponse } from '../__mocks__/fake-request';

// Mocks
import eventMock from './mocks.json';

jest.mock('./services/event-service', () => jest.fn());

describe('EventController', () => {
	let controller: EventController;

	beforeEach(() => {
		controller = new EventController(eventServiceMock);
	});

	describe('createEvent method', () => {
		it('should create an new event', async () => {
			const req = mockRequest({ body: eventMock, user: { id: 1 }, cloudinaryFileUrl: 'fakeurl' });
			const res = mockResponse();
			const next = jest.fn();
			await controller.createEvent(req, res, next);
			expect(res.json).toHaveBeenCalled();
			expect(next).not.toHaveBeenCalled();
		});

    it('should create a event when image is empty', async () => {
      const req = mockRequest({ body: eventMock, user: { id: 1 } });
      const res = mockResponse();
      const next = jest.fn();
      await controller.createEvent(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });

		it('should return an error', async () => {
			const errorMessage: string = 'Network Error';
			jest.spyOn(eventServiceMock, 'create').mockRejectedValue(new Error(errorMessage));
			const req: any = mockRequest({ body: {} });
			const res: any = mockResponse();
			const next: any = jest.fn();
			await controller.createEvent(req, res, next);
			expect(next).toHaveBeenCalled();
			expect(res.json).not.toHaveBeenCalled();
		});
	});

	describe('updateEvent method', () => {
		it('should updated event', async () => {
			const req = mockRequest({ body: eventMock, params: { id: '2' }, user: { id: 2 }, cloudinaryFileUrl: 'fakeurl' });
			const res = mockResponse();
			const next = jest.fn();
			await controller.updateEvent(req, res, next);
			expect(res.json).toHaveBeenCalled();
			expect(next).not.toHaveBeenCalled();
		});

    it('should updated event when image is empty', async () => {
      const req = mockRequest({ body: eventMock, params: { id: '2' }, user: { id: 2 } });
      const res = mockResponse();
      const next = jest.fn();
      await controller.updateEvent(req, res, next);
      expect(res.json).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });

		it('should return an error', async () => {
			const errorMessage: string = 'Network Error';
			jest.spyOn(eventServiceMock, 'update').mockRejectedValue(new Error(errorMessage));
			const req: any = mockRequest({ body: {} });
			const res: any = mockResponse();
			const next: any = jest.fn();
			await controller.updateEvent(req, res, next);
			expect(next).toHaveBeenCalled();
			expect(res.json).not.toHaveBeenCalled();
		});
	});

	describe('getEvents method', () => {
		it('should get all events', async () => {
			const req = mockRequest({ user: { id: 1 } });
			const res = mockResponse();
			const next = jest.fn();
			await controller.getEvents(req, res, next);
			expect(res.json).toHaveBeenCalled();
			expect(next).not.toHaveBeenCalled();
		});

		it('should return an error', async () => {
			const errorMessage: string = 'Network Error';
			jest.spyOn(eventServiceMock, 'findAll').mockRejectedValue(new Error(errorMessage));
			const req: any = mockRequest({ body: {} });
			const res: any = mockResponse();
			const next: any = jest.fn();
			await controller.getEvents(req, res, next);
			expect(next).toHaveBeenCalled();
			expect(res.json).not.toHaveBeenCalled();
		});
	});

	describe('getEventById method', () => {
		it('should get a event by id', async () => {
			const req = mockRequest({ params: { id: 1 } });
			const res = mockResponse();
			const next = jest.fn();
			await controller.getEventById(req, res, next);
			expect(res.json).toHaveBeenCalled();
			expect(next).not.toHaveBeenCalled();
		});

    it('should return 404 when event not found', async () => {
      jest.spyOn(eventServiceMock, 'findOne').mockResolvedValue(null);
      const req = mockRequest({ params: { id: 1 } });
      const res: any = {status: 404};
      const next = jest.fn();
      await controller.getEventById(req, res, next);
      expect(res.status).toEqual(404);
    });

		it('should return an error', async () => {
			const errorMessage: string = 'Network Error';
			jest.spyOn(eventServiceMock, 'findOne').mockRejectedValue(new Error(errorMessage));
			const req: any = mockRequest({ body: {} });
			const res: any = mockResponse();
			const next: any = jest.fn();
			await controller.getEventById(req, res, next);
			expect(next).toHaveBeenCalled();
			expect(res.json).not.toHaveBeenCalled();
		});
	});

	describe('deleteEvent method', () => {
		it('should remove a event by id', async () => {
			const req = mockRequest({ params: { id: 1 } });
			const res = mockResponse();
			const next = jest.fn();
			await controller.deleteEvent(req, res, next);
			expect(res.json).toHaveBeenCalled();
			expect(next).not.toHaveBeenCalled();
		});

		it('should return an error', async () => {
			const errorMessage: string = 'Network Error';
			jest.spyOn(eventServiceMock, 'deleteOne').mockRejectedValue(new Error(errorMessage));
			const req: any = mockRequest({ body: {} });
			const res: any = mockResponse();
			const next: any = jest.fn();
			await controller.deleteEvent(req, res, next);
			expect(next).toHaveBeenCalled();
			expect(res.json).not.toHaveBeenCalled();
		});
	});
});

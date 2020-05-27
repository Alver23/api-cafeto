// Services
import { CEventService } from './event-service';
import { RedisServiceMock } from "../../../core/redis/redis-service-mock";

// Mocks
import eventMock from './../mocks.json';
import {EventService} from "./event-service-interface";

jest.mock('../../users/models/user', () => jest.fn());
jest.mock('../models/event', () => {
	return {
		Event: {
			findAll: () => [{ ...eventMock, id: 1, isOwner: true }],
			create: () => ({ ...eventMock }),
			findOne: () => ({ ...eventMock, id: 1 }),
			update: () => [1],
			destroy: () => 1,
		},
	};
});

describe('EventService', () => {
  let eventService: EventService;
  let redisService: any;
	const expectedProperties = () => ({
		title: expect.any(String),
		description: expect.any(String),
		address: expect.any(String),
		imageUrl: expect.any(String),
		latitude: expect.any(Number),
		longitude: expect.any(Number),
		userId: expect.any(Number),
	});

	beforeEach(() => {
    redisService = new RedisServiceMock();
	  eventService = new CEventService(redisService);
  });

	describe('create method', () => {
		it('should get an new event', () => {
			return eventService.create(eventMock).then((response) => {
				expect(response).toEqual(
					expect.objectContaining({
						...expectedProperties(),
					}),
				);
			});
		});
	});

	describe('update method', () => {
		it('should updated event', () => {
			return eventService.update('1', eventMock).then((response) => {
				expect(response).toEqual([1]);
			});
		});
	});

	describe('findAll method', () => {
		it('should get all event', () => {
			return eventService.findAll({ userId: 1 }).then((response) => {
				expect(response).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							...expectedProperties(),
							id: expect.any(Number),
							isOwner: expect.any(Boolean),
						}),
					]),
				);
			});
		});

		it('should get all events of the cache', () => {
      redisService.setDataInCache('events', [{ ...eventMock, id: 1, isOwner: true }]);
      return eventService.findAll({ userId: 1 }).then((response) => {
        expect(response).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              ...expectedProperties(),
              id: expect.any(Number),
              isOwner: expect.any(Boolean),
            }),
          ]),
        );
      });
    })
	});

	describe('findOne method', () => {
		it('should get a event', () => {
			return eventService.findOne({ query: { id: '1' } }).then((response) => {
				expect(response).toEqual(
					expect.objectContaining({
						...expectedProperties(),
						id: expect.any(Number),
					}),
				);
			});
		});
	});

	describe('deleteOne method', () => {
		it('should removed a event', () => {
			return eventService.deleteOne('1').then((response) => {
				expect(response).toEqual(1);
			});
		});
	});
});

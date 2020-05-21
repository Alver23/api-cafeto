import { EventService } from './event-service-interface';

export class EventServiceMock implements EventService {
	private readonly eventMock = {
		title: 'fake title',
		description: 'description',
		address: 'calle falsa',
		imageUrl: 'https://www.marketingdirecto.com/wp-content/uploads/2019/04/Eventos.jpg',
		latitude: 3.3981867,
		longitude: -76.5543316,
		userId: 1,
	};

	async create() {
		return this.eventMock;
	}

	async update() {
		return [1];
	}

	async findAll() {
		return [{ ...this.eventMock, isOwner: true }];
	}

	async findOne() {
		return this.eventMock;
	}

	async deleteOne() {
		return 1;
	}
}

export const eventServiceMock = new EventServiceMock();

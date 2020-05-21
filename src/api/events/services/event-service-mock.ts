import { EventService } from './event-service-interface';
import { EventAddModel } from '../models/event';

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

	async create(data: EventAddModel) {
		return this.eventMock;
	}

	async update(id: string, data: EventAddModel) {
		return [1];
	}

	async findAll({ userId }: { userId: number }) {
		return [{ ...this.eventMock, isOwner: true }];
	}

	async findOne({ query }: { query: any }) {
		return this.eventMock;
	}

	async deleteOne(id: string) {
		return 1;
	}
}

export const eventServiceMock: EventService = new EventServiceMock();

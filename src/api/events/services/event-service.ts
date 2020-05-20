import { Sequelize } from 'sequelize';
import { Event, EventAddModel } from '../models/event';
import { EventService } from './event-service-interface';
import { User } from '../../users/models/user';

export class CEventService implements EventService {
	private readonly userAttributes = ['id', 'name', 'email'];

	private readonly attributes = ['id', 'title', 'description', 'address', 'imageUrl', 'latitude', 'longitude'];

	private readonly relationship = [{ model: User, as: 'user', attributes: this.userAttributes }];

	public async create(data: EventAddModel) {
		return Event.create<Event>(data);
	}
	public async update(id: string, data) {
		return Event.update<Event>(data, { where: { id: parseInt(id, 10) } });
	}

	public async findAll({ userId }) {
		return Event.findAll<Event>({
			attributes: [
				...this.attributes,
				[Sequelize.literal(`CASE WHEN "user".id = ${userId} THEN true ELSE false END`), 'isOwner'],
			],
			include: this.relationship,
		});
	}

	public async findOne({ query }) {
		return Event.findOne<Event>({
			attributes: this.attributes,
			include: this.relationship,
			where: query,
		});
	}

	public async deleteOne(id: string) {
		return Event.destroy({ where: { id: parseInt(id, 10) } });
	}
}

export const eventService: EventService = new CEventService();

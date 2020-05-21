import { EventAddModel } from '../models/event';

export interface EventService {
	findAll({ userId }: { userId: number });
	findOne({ query });
	create(data: EventAddModel);
	update(id: string, data: EventAddModel);
	deleteOne(id: string);
}

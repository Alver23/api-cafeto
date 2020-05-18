import { UserService } from './user-service-interface';
import { UserAddModel } from '../models/user';

export class UserServiceMock implements UserService {
	private readonly mock = { id: 1, name: 'Fake name', email: 'fake@fake.com' };

	async findAll() {
		return [this.mock];
	}

	async create(user: UserAddModel) {
		return this.mock;
	}

	async verifyEmail(email: string) {
		return null;
	}

	async findOrCreate(user: UserAddModel) {
		return this.mock;
	}
}

export const userServiceMock: UserService = new UserServiceMock();

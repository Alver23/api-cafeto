import { UserService } from './user-service-interface';

export class UserServiceMock implements UserService {
	private readonly mock = { id: 1, name: 'Fake name', email: 'fake@fake.com' };

	async findAll() {
		return [this.mock];
	}

	async create() {
		return this.mock;
	}

	async verifyEmail() {
		return null;
	}

	async findOrCreate() {
		return this.mock;
	}
}

export const userServiceMock: UserService = new UserServiceMock();

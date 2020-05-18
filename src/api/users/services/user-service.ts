import { hash } from 'bcrypt';

import { UserTransformer } from '../models/user-transformer';
import { User, UserAddModel } from '../models/user';
import { UserService } from './user-service-interface';

export class CUserService implements UserService {
	private readonly saltRound = 10;

	private readonly attributes = ['id', 'name', 'email'];

	public async findAll() {
		return User.findAll<User>({ attributes: this.attributes });
	}

	public async create(user: UserAddModel) {
		const { name, email, password } = user;
		const hashedPassword = await hash(password, this.saltRound);
		const userCreated = await User.create<User>({ name, email, password: hashedPassword });
		return new UserTransformer(userCreated);
	}

	public async getUser(query: any) {
		return User.findOne<User>({
			where: query,
		});
	}

	public verifyEmail(email: string) {
		return this.getUser({ email });
	}

	public async findOrCreate(user: UserAddModel) {
		const { email, name, password } = user;
		const [userCreated] = await User.findOrCreate({ where: { email }, defaults: { name, password } });
		return new UserTransformer(userCreated);
	}
}

export const userService = new CUserService();

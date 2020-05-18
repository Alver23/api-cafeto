import { UserAddModel } from '../models/user';

export interface UserService {
	findAll();
	create(user: UserAddModel);
	verifyEmail(email: string);
	findOrCreate(user: UserAddModel);
}

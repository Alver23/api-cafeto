import { UserViewModel } from '../../users/models/user';

export interface AuthService {
	createToken(user: UserViewModel): string;
}

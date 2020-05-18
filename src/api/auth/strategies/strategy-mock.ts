import * as passport from 'passport';
import { inherits } from 'util';

export function StrategyMock() {
	this.name = 'mock';
	this.passAuthentication = true;
	this.userId = 1;
}

inherits(StrategyMock, passport.Strategy);

StrategyMock.prototype.authenticate = function authenticate(req) {
	if (this.passAuthentication) {
		const user = {
			id: this.userId,
		};
		return user;
	}
	this.fail('Unauthorized');
};

import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
	appName: process.env.APP_NAME,
	port: process.env.PORT || 3001,
	env: process.env.NODE_ENV !== 'production',
	environment: process.env.NODE_ENV || 'development',
	databaseConfig: {
		url: process.env.DATABASE_URL,
		dialect: 'postgres',
	},
	jwt: {
		secret: process.env.AUTH_JWT_SECRET,
		expires: process.env.AUTH_JWT_EXPIRES,
	},
};

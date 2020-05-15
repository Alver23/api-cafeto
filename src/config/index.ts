import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
	appName: process.env.APP_NAME,
	env: process.env.NODE_ENV !== 'production',
	environment: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3001,
};

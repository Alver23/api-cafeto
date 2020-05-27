import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const env = process.env.NODE_ENV !== 'production';
const appUrl = process.env.APP_URL;
export const config = {
	env,
	appUrl,
	domain: env ? `${appUrl}:${port}` : appUrl,
	appName: process.env.APP_NAME,
	port: process.env.PORT || 3001,
	environment: process.env.NODE_ENV || 'development',
	databaseConfig: {
		url: process.env.DATABASE_URL,
		dialect: 'postgres',
	},
	jwt: {
		secret: process.env.AUTH_JWT_SECRET,
		expires: process.env.AUTH_JWT_EXPIRES,
		refresTokenExpires: parseInt(process.env.AUTH_REFRESH_TOKEN_EXPIRES, 10),
	},
	staticFiles: {
		directory: 'public',
		pathUploads: 'uploads/',
	},
	cloud: {
		name: process.env.CLOUD_NAME,
		apiKey: process.env.CLOUD_API_KEY,
		apiSecret: process.env.CLOUD_API_SECRET,
	},
	sentryDsn: process.env.SENTRY_DSN,
	redis: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT, 10),
		password: process.env.REDIS_PASSWORD,
	},
};

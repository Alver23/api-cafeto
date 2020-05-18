import { Sequelize } from 'sequelize';
import { config } from '../../config';

const {
	databaseConfig: { url },
} = config;
const debug = require('debug')(`${config.appName}:sequalize-connection`);

export const sequelize = new Sequelize(url);

sequelize
	.authenticate()
	.then(() => debug('Connection has been established successfully.'))
	.catch((err) => debug(`Unable to connect to the database: ${err}`));

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../core/sequelize/sequelize';
import { config } from '../../../config';
import { User } from '../../users/models/user';

const debug = require('debug')(`${config.appName}:event-model`);

export interface EventAddModel {
	title: string;
	description?: string;
	address?: string;
	imageUrl?: string;
	latitude: number;
	longitude: number;
	userId?: number;
}

export interface EventModel extends EventAddModel {
	id: number;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
}

export class Event extends Model<EventModel> {
	public id!: number;

	public title!: string;

	public description?: string;

	public address?: string;

	public imageUrl?: string;

	public latitude: number;

	public longitude: number;

	public userId?: number;

	// timestamps!
	public readonly createdAt!: Date;

	public readonly updatedAt!: Date;
}

Event.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		description: {
			type: new DataTypes.TEXT(),
			allowNull: true,
		},
		address: {
			type: new DataTypes.TEXT(),
			allowNull: true,
		},
		imageUrl: {
			type: new DataTypes.STRING(),
			allowNull: true,
		},
		latitude: {
			type: new DataTypes.FLOAT(),
			allowNull: false,
		},
		longitude: {
			type: new DataTypes.FLOAT(),
			allowNull: false,
		},
	},
	{
		tableName: 'events',
		sequelize,
	},
);

Event.belongsTo(User, { foreignKey: 'userId', as: 'user' });

sequelize.sync().then(() => debug('Event table created'));

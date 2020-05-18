import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../core/sequelize/sequelize';
import { config } from '../../../config';

const debug = require('debug')(`${config.appName}:user-model`);

export interface UserAddModel {
	name: string;
	email: string;
	password: string;
}

export interface UserViewModel {
	id: number;
	name: string;
	email: string;
}

export interface UserModel extends UserAddModel {
	id: number;
	createdAt: Date;
	updatedAt: Date;
}

export class User extends Model {
	public id!: number;

	public name!: string;

	public email!: string;

	public password!: string;

	// timestamps!
	public readonly createdAt!: Date;

	public readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: new DataTypes.STRING(128),
			allowNull: false,
		},
		email: {
			type: new DataTypes.STRING(),
			allowNull: false,
			unique: true,
		},
		password: {
			type: new DataTypes.STRING(),
			allowNull: false,
		},
	},
	{
		tableName: 'users',
		sequelize,
	},
);

sequelize.sync().then(() => debug('User table created'));

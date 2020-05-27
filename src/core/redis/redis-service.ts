import { promisifyAll } from 'bluebird';
import { createClient, RedisClient, ClientOpts } from 'redis';
import { config } from '../../config';

const debug = require('debug')(`${config.appName}:redis`);

const redisConfig = config.redis;

export class RedisService {
	private clientOpts: ClientOpts;

	private redisClient: RedisClient;

	private redisClientPromise: any;

	private static instance: RedisService;

	private constructor(clientOpts?: ClientOpts) {
		if (RedisService.instance) return;
		this.clientOpts = clientOpts || redisConfig;
	}

	private onReady(): void {
		debug('Redis connection was successfully established.');
	}

	private onEnd(): void {
		debug('Redis connection was closed.');
	}

	private onError(err: any): void {
		debug('There is an error: ');
	}

	public static getInstance(clientOpts?: ClientOpts): RedisService {
		if (!RedisService.instance) {
			RedisService.instance = new RedisService(clientOpts);
			RedisService.instance.redisConnect();
		}
		return RedisService.instance;
	}

	public get client(): RedisClient {
		if (!this.redisClient.connected) throw new Error('There is no connection to Redis DB!');
		return this.redisClient;
	}

	public redisConnect(): void {
		this.redisClient = createClient(this.clientOpts);
		this.redisClient.on('ready', this.onReady).on('end', this.onEnd).on('error', this.onError);
	}

	public get clientAsync(): any {
		this.redisClientPromise = promisifyAll(this.client);
		return this.redisClientPromise;
	}

	public setDataInCache(key, data, timeout) {
		this.redisClient.setex(key, timeout, JSON.stringify(data));
	}
}

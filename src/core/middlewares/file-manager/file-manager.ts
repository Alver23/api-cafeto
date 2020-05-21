import * as fs from 'fs';
import { config } from '../../../config';

const cloudinary = require('cloudinary').v2;
const multer = require('multer');

export const diskStorage = () => {
	const {
		staticFiles: { directory },
	} = config;
	const destination = `build/${directory}`;

	return multer.diskStorage({
		destination(req, file, cb) {
			cb(null, destination);
		},
		filename(req, file, cb) {
			const [name] = file.originalname.split('.');
			cb(null, `${name}-${Date.now()}`);
		},
	});
};

export const cloudinaryMiddleware = async (req: any, res: any, next: any) => {
	const {
		cloud: { apiKey, apiSecret, name },
	} = config;
	cloudinary.config({
		cloud_name: name,
		api_key: apiKey,
		api_secret: apiSecret,
	});
	if (!req.file) {
		return next();
	}
	const { path, filename } = req.file;
	try {
		const response = await cloudinary.uploader.upload(path, { public_id: `events/${filename}`, tags: `events` });
		fs.unlinkSync(path);
		req.cloudinaryFileUrl = response.secure_url;
		next();
	} catch (error) {
		next(error);
	}
};

export const storageMiddleware = (storage) => multer({ storage });

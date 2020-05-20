import { config } from '../../../config';

const multer = require('multer');

export const diskStorage = (fileDirectory: string) => {
	const {
		staticFiles: { directory },
	} = config;
	const destination = `build/${directory}/${fileDirectory}`;

	return multer.diskStorage({
		destination(req, file, cb) {
			cb(null, destination);
		},
		filename(req, file, cb) {
			const [name, extension] = file.originalname.split('.');
			cb(null, `${name}-${Date.now()}.${extension}`);
		},
	});
};
export const storageMiddleware = (storage) => multer({ storage });

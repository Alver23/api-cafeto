const multer = require('multer');

import { config } from '../../../config';

export const diskStorage = (fileDirectory: string) => {
	const {
		staticFiles: { directory },
	} = config;
	const destination = `build/${directory}/${fileDirectory}`;

	return multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, destination);
		},
		filename: function (req, file, cb) {
			const [name, extension] = file.originalname.split('.');
			cb(null, `${name}-${Date.now()}.${extension}`);
		},
	});
};
export const storageMiddleware = (storage) => multer({ storage });

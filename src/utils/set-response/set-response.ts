import { OK } from 'http-status-codes';

export const setResponse = ({
	message,
	data,
	status,
	options,
}: {
	message?: string;
	data?: any;
	status?: number;
	options?: any;
}) => {
	let statusCode = OK;
	let additionalOptions = {};
	if (status) {
		statusCode = status;
	}

	if (options) {
		additionalOptions = options;
	}
	return {
		message,
		status: statusCode,
		data,
		...additionalOptions,
	};
};

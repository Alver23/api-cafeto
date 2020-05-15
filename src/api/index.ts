import * as cors from 'cors';
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

import { errorHandler, fourOFour, logErrors, wrapError } from '../core/middlewares';

const api: express.Application = express();

// Helmet Segurity
api.use(helmet());

// Enable method-override for old clients
api.use(methodOverride());

// Enable CORS
api.use(cors());

// Enable request body parsing
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.json({ message: 'hello word' });
});

api.use(fourOFour);
api.use(logErrors);
api.use(wrapError);
api.use(errorHandler);

export default api;

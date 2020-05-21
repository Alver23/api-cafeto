import * as cors from 'cors';
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDoc from './swagger/swagger.json';

import { errorHandler, fourOFour, logErrors, wrapError } from '../core/middlewares';

import { userRouter } from './users/user-router';
import { authRouter } from './auth/auth-router';
import { eventRouter } from './events/event-router';

const api: express.Application = express();

// Enable CORS
api.use(cors());

// Helmet Segurity
api.use(helmet());

// Enable method-override for old clients
api.use(methodOverride());

// parse application/json
api.use(bodyParser.json());

// Enable request body parsing
api.use(bodyParser.urlencoded({ extended: false }));

api.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
userRouter(api);
authRouter(api);
eventRouter(api);

api.use(fourOFour);
api.use(logErrors);
api.use(wrapError);
api.use(errorHandler);

export default api;

import * as cors from 'cors';
import * as express from 'express';
import * as methodOverride from 'method-override';
import { json, urlencoded } from 'body-parser';
import * as helmet from 'helmet';

import { errorHandler, fourOFour, logErrors, wrapError } from '../core/middlewares';

import { userRouter } from './users/user-router';
import { authRouter } from './auth/auth-router';

const api: express.Application = express();

// Helmet Segurity
api.use(helmet());

// Enable method-override for old clients
api.use(methodOverride());

// Enable CORS
api.use(cors());

// Enable request body parsing
api.use(json());
api.use(urlencoded({ extended: true }));

userRouter(api);
authRouter(api);

api.use(fourOFour);
api.use(logErrors);
api.use(wrapError);
api.use(errorHandler);

export default api;

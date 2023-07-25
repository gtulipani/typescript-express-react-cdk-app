import express, {Express} from 'express'
import * as dotenv from 'dotenv'

import {configureRouter} from './router';

dotenv.config()

const app: Express = express();

configureRouter(app)

app.listen(process.env.PORT || '8080', () => console.log(`Running on http://localhost:${process.env.PORT || '8080'}`))

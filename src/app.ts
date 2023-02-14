import express from 'express';
import morgan from 'morgan';
import routerUser from '@Routers/UserRouter';
import routerTask from '@Routers/TaskRouter';
import { UserModel } from '@Models/UserModels';
import './Configs/DB_Connect';

const app = express();

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

app.use(express.json());
app.use(routerUser);
app.use(routerTask);

export default app;

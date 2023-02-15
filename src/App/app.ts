import express from 'express';
import morgan from 'morgan';
import routerUser from '@App/Routers/UserRouter';
import routerTask from '@App/Routers/TaskRouter';
import { ErrorController } from '@App/Controllers/ErrorController';
import '@App/Configs/DB_Connect';

const app = express();

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

app.use(express.json());
app.use(routerUser);
app.use(routerTask);

app.all('*', (req, res, next) => {
    res.status(404).json('Error 404');
});
app.use(ErrorController);

export default app;

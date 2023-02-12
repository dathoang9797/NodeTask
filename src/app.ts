import express from 'express';
import morgan from 'morgan';
import './Configs/DB_Connect';
import './Models/TaskModels';
import './Models/UserModels';

const app = express();

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

app.use(express.json());

export default app;

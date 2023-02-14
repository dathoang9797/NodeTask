
import express, { Request, Response } from 'express';
import { TaskModel } from '@Models/TaskModels';

const routerTask = express.Router();

routerTask.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to Hoang Quy Dat 1997',
    });
});

export default routerTask;
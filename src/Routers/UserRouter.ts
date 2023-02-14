import express, { Request, Response } from 'express';
import { UserModel } from '@Models/UserModels';

const routerUser = express.Router();

routerUser.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Hoang Quy Dat 1997',
  });
});

export default routerUser;
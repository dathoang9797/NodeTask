import { NextFunction } from 'express';
import { IReqUser, IResUser } from '@App/Core/Models/User';
export declare const auth: (req: IReqUser, res: IResUser, next: NextFunction) => Promise<void>;

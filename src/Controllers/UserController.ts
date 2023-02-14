import { NextFunction } from 'express';
import { IReqUser, IResUser, IUserDocument } from '@App/Core/Models/User';
import { catchError, AppErrorHandling, MessageLog } from '@App/Utils'
import { UserModel } from '@App/Models/UserModels';
import { sendWelcomeEmail } from '@App/Email/Account';

const { errorCreateUser } = MessageLog;

export const createUser = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    const user = new UserModel(req.body);
    if (!user)
        return next(new AppErrorHandling(errorCreateUser, 500))

    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
})

export const userLogin = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    const user = await UserModel.findByCredentials(
        req.body.email,
        req.body.password
    );
    if (!user)
        return next(new AppErrorHandling(errorCreateUser, 400))

    const token = await user.generateAuthToken();
    res.send({ user, token });
})

export const userLogout = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    req.user.tokens = req.user.tokens.filter(token => {
        return token.token !== req.token;
    }) as IUserDocument['tokens'];
    const userUpdate = await req.user.save();

    if (!userUpdate)
        return next(new AppErrorHandling(errorCreateUser, 500))
    res.send();
})

export const userLogoutAll = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    req.user.tokens = [] as IUserDocument['tokens'];
    const userUpdate = await req.user.save();
    if (!userUpdate)
        return next(new AppErrorHandling(errorCreateUser, 500))
    res.send();
})

export const getUser = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    if (req.user)
        return next(new AppErrorHandling(errorCreateUser, 500))
    res.send(req.user);
})

export const getUserById = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    const user = await UserModel.findById(req.params.id);
    if (!user)
        return next(new AppErrorHandling(errorCreateUser, 404))
    res.send(user);
})
import { NextFunction } from 'express';
import sharp from 'sharp';
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

    if (!userUpdate.isNew)
        return next(new AppErrorHandling(errorCreateUser, 500))
    res.send();
})

export const userLogoutAll = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    req.user.tokens = [] as IUserDocument['tokens'];
    const userUpdate = await req.user.save();
    if (!userUpdate.isNew)
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

export const getUserMe = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    const user = req.user as IUserDocument;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every(element =>
        allowedUpdates.includes(element)
    );
    if (!isValidOperation)
        return next(new AppErrorHandling("Invalid updates", 400));

    updates.forEach(element => (user[element as keyof typeof user] = req.body[element] as never));
    const userUpdate = await user.save();
    if (!userUpdate.isNew)
        return next(new AppErrorHandling("Updates Err", 400));
    res.send(req.user);
})

export const deleteUser = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    const userDelete = await req.user.remove();
    if (!userDelete.$isDeleted)
        return next(new AppErrorHandling("Delete Err", 500));
    res.send(req.user);
})

export const uploadAvatarUser = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    const user = req.user as IUserDocument;
    user.avatar = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();

    const userUpdate = await user.save();
    if (!userUpdate.isNew)
        return next(new AppErrorHandling("Upload Avatar Err", 400));
    res.send();
})

export const deleteAvatarUser = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    req.user.avatar = undefined;
    const userUpdate = await req.user.save();
    if (!userUpdate.$isDeleted)
        return next(new AppErrorHandling("Delete Avatar", 400));
    res.send();

})

export const getAvatarUser = catchError(async (req: IReqUser, res: IResUser, next: NextFunction) => {
    const user = await UserModel.findById(req.params.id);
    if (!user || !user.avatar)
        throw new Error();
    res.set("Content-Type", "image/jpg"); // Setting a response header name/value
    res.send(user.avatar);
    res.status(404).send();
})
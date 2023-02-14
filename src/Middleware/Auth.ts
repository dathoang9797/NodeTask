import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import { UserModel } from '@App/Models/UserModels';
import { IReqUser, IResUser } from '@App/Core/Models/User'
import { JwtPayload } from '@App/Core/Models/Jwt';


export const auth = async (req: IReqUser, res: IResUser, next: NextFunction) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        const user = await UserModel.findOne({
            _id: decoded._id,
            "tokens.token": token
        });

        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid authentication" });
    }
};
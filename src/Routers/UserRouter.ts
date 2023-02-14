import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { UserModel } from '@App/Models/UserModels';
import { auth } from '@App/Middleware/Auth';
import { IUserDocument, IReqUser, IResUser } from '@App/Core/Models/User';
import { createUser, userLogin, userLogout, userLogoutAll, getUser, getUserById } from '@App/Controllers/UserController';

const routerUser = express.Router();

routerUser.post("/users", createUser);

routerUser.post("/users/login", userLogin);

routerUser.post("/users/logout", userLogout);

routerUser.post("/users/logoutAll", userLogoutAll);

routerUser.get("/users/me", auth, getUser);

routerUser.get("/users/:id", auth, getUserById);

routerUser.patch("/users/me", auth, async (req: IReqUser, res: IResUser) => {
    try {
        const user = req.user as IUserDocument;
        const updates = Object.keys(req.body);
        const allowedUpdates = ["name", "email", "password", "age"];
        const isValidOperation = updates.every(element =>
            allowedUpdates.includes(element)
        );
        if (!isValidOperation) res.status(400).send({ error: "Invalid updates" });
        updates.forEach(element => (user[element as keyof typeof user] = req.body[element] as never));
        await user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

routerUser.delete("/users/me", auth, async (req: IReqUser, res: IResUser) => {
    try {
        const user = req.user as IUserDocument;
        await user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// \.(doc|docx)$ -> regular expression for serach for determined file extensions
const upload = multer({
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb) {
        //if (!file.originalname.endsWith(".pdf")) {
        if (file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error("Error in upload format"));
        }

        cb(undefined, true);
        //cb(undefined, false);
    }
});

// On postman: Body->form-data->KEY equals FIELD that equals a file
routerUser.post(
    "/users/me/avatar",
    auth,
    upload.single("avatar"),
    async (req, res) => {
        try {
            const user = req.user as IUserDocument;
            user.avatar = await sharp(req.file.buffer)
                .resize({ width: 250, height: 250 })
                .png()
                .toBuffer();

            await user.save();
            res.send();
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
);

routerUser.delete("/users/me/avatar", auth, async (req: IReqUser, res: IResUser) => {
    try {
        const user = req.user as IUserDocument;
        user.avatar = undefined;
        await user.save();
        res.send();
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

routerUser.get("/users/:id/avatar", async (req: IReqUser, res: IResUser) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user || !user.avatar) throw new Error();
        res.set("Content-Type", "image/jpg"); // Setting a response header name/value
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
});

export default routerUser;
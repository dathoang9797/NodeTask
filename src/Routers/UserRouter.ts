import express from 'express';
import { UserModel } from '@App/Models/UserModels';
import { auth } from '@App/Middleware/Auth';
import { IUserDocument, IReqUser, IResUser } from '@App/Core/Models/User';
import { createUser, userLogin, userLogout, userLogoutAll, getUser, getUserById, getUserMe, deleteUser, uploadAvatarUser, deleteAvatarUser, getAvatarUser } from '@App/Controllers/UserController';
import { upload } from '@App/Utils';


const routerUser = express.Router();

routerUser.post("/users", createUser);

routerUser.post("/users/login", userLogin);

routerUser.post("/users/logout", userLogout);

routerUser.post("/users/logoutAll", userLogoutAll);

routerUser.get("/users/me", auth, getUser);

routerUser.get("/users/:id", auth, getUserById);

routerUser.patch("/users/me", auth, getUserMe);

routerUser.delete("/users/me", auth, deleteUser);

// On postman: Body->form-data->KEY equals FIELD that equals a file
routerUser.post("/users/me/avatar", auth, upload.single("avatar"), uploadAvatarUser);

routerUser.delete("/users/me/avatar", auth, deleteAvatarUser);

routerUser.get("/users/:id/avatar",getAvatarUser);

export default routerUser;
import { Types, Document, Model } from "mongoose"
import { Request, Response } from 'express';
import { IUserDocument } from "./User";

export interface ITask extends Document {
    description: string,
    completed: boolean,
    owner: Types.ObjectId
}

interface ITaskQuery {
    limit: string,
    skip: string,
    completed: string,
    sortBy: string,
}

interface ITaskParam {
    id: string
}


export interface ITaskDocument extends ITask, Document { }

export interface ITaskModal extends Model<ITaskDocument> { }

export interface IReqTask extends Request<ITaskParam, {}, {}, ITaskQuery> {
    user: {
        tasks: string[]
    } & IUserDocument
}

export interface IResTask extends Response {

}
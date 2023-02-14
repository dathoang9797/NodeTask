import { Types, Document, Model } from 'mongoose';
import { Request, Response } from 'express';
export interface IUser {
  name: string,
  email: string,
  password: string,
  age: number,
  tokens: Types.DocumentArray<{ _id: Types.ObjectId, token: string }>
  avatar: Buffer,
  generateAuthToken: Function,
  convertJSON: Function
}

export interface IUserDocument extends IUser, Document {
}

export interface IUserModal extends Model<IUserDocument> {
  findByCredentials(email: string, password: string): IUserDocument,
}

export interface IReqUser extends Request {
  token: string,
}

export interface IResUser extends Response {

}
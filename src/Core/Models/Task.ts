import { Types, Document, Model } from "mongoose"
export interface ITask extends Document {
    description: string,
    completed: boolean,
    owner: Types.ObjectId
}



export interface ITaskDocument extends ITask, Document { }

export interface ITaskModal extends Model<ITaskDocument> { }
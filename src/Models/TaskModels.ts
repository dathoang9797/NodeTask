import { ITaskDocument } from '@Core/Models/Task';
import {Schema,model} from 'mongoose';

const TaskSchema = new Schema<ITaskDocument>({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},
    {
        timestamps: true //Automatically adds created/updated
    }
);

export const TaskModel = model('Task', TaskSchema);
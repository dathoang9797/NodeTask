import { Task } from '@Core/Models/Task';
import mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema<Task>({
    description: { type: String },
    completed: { type: Boolean },

});

export const TaskModel = mongoose.model('Task', TaskSchema);


const task = new TaskModel({
    description: 'Learn mongoose',
    completed: true
})

task.save().then((result) => {
    console.log({ result })
}).catch(console.log)
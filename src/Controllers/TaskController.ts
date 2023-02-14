import { NextFunction } from 'express';
import { TaskModel } from '@App/Models/TaskModels';
import { IReqTask, IResTask } from '@App/Core/Models/Task';
import { catchError, AppErrorHandling, MessageLog } from '@App/Utils'
import { IUserDocument } from '@App/Core/Models/User';

export const createTask = catchError(async (req: IReqTask, res: IResTask, next: NextFunction) => {
    const reqUser = req.user;
    const task = new TaskModel({
        ...req.body,
        owner: reqUser._id
    });
    if (!task) {
        const { errorCreateTask } = MessageLog;
        return next(new AppErrorHandling(errorCreateTask, 400))
    }
    await task.save();
    res.status(201).send(task);
})

export const getTask = catchError(async (req: IReqTask, res: IResTask, next: NextFunction) => {
    const reqUser = req.user as IUserDocument;
    const match = {} as { completed: boolean };
    const sort = {} as { [key: string]: number }; //{createdAt: 1 // 1: asc, -1: desc}
    if (req.query.completed)
        match.completed = req.query.completed === "true";

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    const result = await reqUser
        .populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })

    if (!result) {
        const { errorFetchTasks } = MessageLog;
        return next(new AppErrorHandling(errorFetchTasks, 400))
    }

    res.send(req.user.tasks);
})

export const getTaskById = catchError(async (req: IReqTask, res: IResTask, next: NextFunction) => {
    const task = await TaskModel.findOne({
        _id: req.params.id,
        owner: req.user._id
    });
    if (!task) {
        const { errorFetchTasks } = MessageLog;
        return next(new AppErrorHandling(errorFetchTasks, 400))
    }
    res.send(task);
})
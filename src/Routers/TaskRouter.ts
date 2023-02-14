import express from 'express';
import { auth } from '@App/Middleware/Auth';
import { createTask, getTask, getTaskById } from '@App/Controllers/TaskController';

const routerTask = express.Router();

routerTask.post("/tasks", auth, createTask);

// GET /tasks?completed=true  query
// GET /taks?limit=10&skip=0  pagination
// GET /tasks?sortBy=createdAt:desc
routerTask.get("/tasks", auth, getTask);

routerTask.get("/tasks/:id", auth, getTaskById);

export default routerTask;
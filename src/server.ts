import '@Configs/DB_Connect';
import { routerUser } from '@Routers/UserRouter';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

//middleware: body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//router
app.use('/api/users',routerUser)

app.listen(port, () => {
  console.log('Server running on port: ' + port);
});

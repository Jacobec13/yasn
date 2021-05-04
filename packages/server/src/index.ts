import express from 'express';
import bodyParser from "body-parser";

import './db/Mongo';
import {addUserController} from "./user/userController";
import {authMiddleware} from "./auth/AuthMidleware";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(authMiddleware);

addUserController(app);

app.listen(port, () => console.log(`Server up on port: ${port}`));

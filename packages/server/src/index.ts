import express from 'express';
import bodyParser from "body-parser";

import './db/Mongo';
import {CreateUserDTO} from "@yasn/api";
import {createUser} from "./db/UserDAO";
import {addUserController} from "./controllers/userController";

const app = express();
const port = 3000;

app.use(bodyParser.json());

addUserController(app);

app.listen(port, () => console.log(`Server up on port: ${port}`));

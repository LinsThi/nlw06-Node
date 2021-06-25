import { Router } from 'express';

import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';

import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from './controllers/CreateTagController';
import { CreateComplimentController } from './controllers/CreateComplimentController';

import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListTagController } from './controllers/ListTagController';
import { ListUserController } from './controllers/ListUserController';

const router = Router();

const authenticateUserController = new AuthenticateUserController();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();

const listUserSendCompliments = new ListUserSendComplimentsController();
const listUserReceiveCompliments = new ListUserReceiveComplimentsController();
const listTags = new ListTagController();
const listUsers = new ListUserController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/session", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/send", ensureAuthenticated, listUserSendCompliments.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveCompliments.handle);
router.get("/tags", ensureAuthenticated, ensureAdmin, listTags.handle);
router.get("/users/list", ensureAuthenticated, ensureAdmin, listUsers.handle);

export { router }
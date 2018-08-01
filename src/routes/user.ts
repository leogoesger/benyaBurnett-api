import { Router } from 'express';
import { userController } from '../controllers';

const user = Router();

user.route('/login').post(userController.logIn);
user.route('/signup').post(userController.signUp);
user.route('/users').post(userController.listUsers);

export default user;

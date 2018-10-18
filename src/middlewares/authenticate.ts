import { User } from '../models';
import { Response } from 'express';

const authenticate = (req: any, res: Response, next: any) => {
  const token = req.header('Authorization');
  console.log('token authen midddle', token);
  User.findByToken(token)
    .then(user => {
      if (!user) {
        res.status(401).send({ message: 'No user found!' });
      }
      req.body.user = user;
      next();
    })
    .catch(e => {
      res.status(401).send({ message: 'Authentication Failed!' });
    });
};

export default authenticate;

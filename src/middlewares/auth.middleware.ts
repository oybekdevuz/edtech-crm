import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ACCESS_SECRET_KEY } from '@config';
import { AdminEntity } from '@/entities/admins.entity';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, RequestWithAdmin } from '@interfaces/auth.interface';

const getAuthorization = (req: Request) => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithAdmin, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { id } = (await verify(Authorization, ACCESS_SECRET_KEY)) as DataStoredInToken;
      const findAdmin = await AdminEntity.findOne(id, { select: ['id', 'username', 'password'] });

      if (findAdmin) {
        req.user = findAdmin;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

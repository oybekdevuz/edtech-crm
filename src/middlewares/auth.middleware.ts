import { NextFunction, Request, Response } from 'express';
import { AdminEntity } from '@/entities/admins.entity';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, RequestWithAdmin } from '@interfaces/auth.interface';
import { JwtService } from '../utils/jwt-token';

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
      const jwtService = new JwtService();
      const { id } = jwtService.validateAccessToken(Authorization) as DataStoredInToken;
      const findAdmin = await AdminEntity.findOne(id, { select: ['id', 'username', 'password'] });

      if (findAdmin) {
        req.user = findAdmin;
        next();
      } else {
        next(new HttpException(401, 'Unauthorized'));
      }
    } else {
      next(new HttpException(404, 'Unauthorized'));
    }
  } catch (error) {
    next(new HttpException(401, 'Unauthorized'));
  }
};

import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithAdmin } from '@interfaces/auth.interface';
import { IAdmin } from '@/interfaces/admins.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IAdmin = req.body;
      const signUpAdminData: IAdmin = await this.auth.signup(userData);

      res.status(201).json({ data: signUpAdminData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IAdmin = req.body;
      const { cookie, findAdmin } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findAdmin, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithAdmin, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IAdmin = req.user;
      const logOutAdminData: IAdmin = await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutAdminData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithAdmin } from '@interfaces/auth.interface';
import { IAdmin } from '@/interfaces/admins.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUpAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IAdmin = req.body;
      const signUpAdminData: IAdmin = await this.auth.signup(userData);

      res.status(201).json({ data: signUpAdminData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logInAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IAdmin = req.body;
      const { cookie, findAdmin, tokens } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { admin: findAdmin, tokens }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public refreshTokenAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cookie, tokens } = this.auth.refreshToken(req);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { tokens }, message: 'refreshed token' });
    } catch (error) {
      next(error);
    }
  };

  public logOutAdmin = async (req: RequestWithAdmin, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IAdmin = req.user;
      await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: {}, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

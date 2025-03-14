import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateAdminDto } from '@/dtos/admins.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', AuthMiddleware, ValidationMiddleware(CreateAdminDto), this.auth.signUpAdmin);
    this.router.post('/login', ValidationMiddleware(CreateAdminDto), this.auth.logInAdmin);
    this.router.post('/logout', AuthMiddleware, this.auth.logOutAdmin);
    this.router.post('/refresh-token', AuthMiddleware, this.auth.refreshTokenAdmin);
  }
}

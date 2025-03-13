import { Router } from 'express';
import { AdminController } from '@controllers/users.controller';
import { CreateAdminDto } from '@/dtos/admins.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class AdminRoute implements Routes {
  public path = '/admins';
  public router = Router();
  public user = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getAdmins);
    this.router.get(`${this.path}/:id(\\d+)`, this.user.getAdminById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateAdminDto), this.user.createAdmin);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateAdminDto, true), this.user.updateAdmin);
    this.router.delete(`${this.path}/:id(\\d+)`, this.user.deleteAdmin);
  }
}

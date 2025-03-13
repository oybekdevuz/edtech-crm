import { Router } from 'express';
import { AdminController } from '@/controllers/admin.controller';
import { CreateAdminDto } from '@/dtos/admins.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class AdminRoute implements Routes {
  public path = '/admins';
  public router = Router();
  public user = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.user.getAdmins);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.user.getAdminById);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(CreateAdminDto, true), this.user.updateAdmin);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.user.deleteAdmin);
  }
}

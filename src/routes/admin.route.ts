import { Router } from 'express';
import { AdminController } from '@/controllers/admin.controller';
import { CreateAdminDto } from '@/dtos/admins.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class AdminRoute implements Routes {
  public path = '/admins';
  public router = Router();
  public controller = new AdminController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.controller.getAdmins);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.controller.getAdminById);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateAdminDto, true), this.controller.updateAdmin);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.controller.deleteAdmin);
  }
}

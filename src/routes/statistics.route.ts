import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { StatisticsController } from '@/controllers/statistics.controller';

export class StatisticsRoute implements Routes {
  public path = '/statistics';
  public router = Router();
  public controller = new StatisticsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.controller.get);
  }
}

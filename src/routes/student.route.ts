import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { StudentController } from '../controllers/student.controller';
import { CreateStudentDto } from '../dtos/students.dto';

export class StudentRoute implements Routes {
  public path = '/students';
  public router = Router();
  public controller = new StudentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateStudentDto), this.controller.create);
    this.router.get(`${this.path}`, AuthMiddleware, this.controller.get);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.controller.getById);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateStudentDto, true), this.controller.update);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.controller.deleteData);
  }
}

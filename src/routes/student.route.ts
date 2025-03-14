import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { StudentController } from '../controllers/student.controller';
import { CreateStudentDto } from '../dtos/students.dto';

export class StudentRoute implements Routes {
  public path = '/students';
  public router = Router();
  public user = new StudentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateStudentDto), this.user.create);
    this.router.get(`${this.path}`, AuthMiddleware, this.user.get);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.user.getById);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateStudentDto, true), this.user.update);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.user.deleteData);
  }
}

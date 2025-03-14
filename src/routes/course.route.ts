import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { CourseController } from '../controllers/course.controller';
import { CreateCourseDto } from '../dtos/course.dto';
import { CourseActionDto } from '@/dtos/enroll-student.dto';

export class CourseRoute implements Routes {
  public path = '/courses';
  public router = Router();
  public controller = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateCourseDto), this.controller.create);
    this.router.post(`${this.path}/enroll-student`, AuthMiddleware, ValidationMiddleware(CourseActionDto), this.controller.enrollStudent);
    this.router.post(`${this.path}/withdraw-student`, AuthMiddleware, ValidationMiddleware(CourseActionDto), this.controller.withdrawStudent);
    this.router.get(`${this.path}`, AuthMiddleware, this.controller.get);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.controller.getById);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateCourseDto, true), this.controller.update);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.controller.deleteData);
  }
}

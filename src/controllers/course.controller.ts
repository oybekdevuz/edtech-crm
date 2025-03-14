import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CourseService } from '../services/course.service';
import { ICourses } from '../interfaces/courses.interface';
import { EnrollStudentDto } from '@/dtos/enroll-student.dto';
import { StudentCourseEntity } from '@/entities/studentCourses.entity';

export class CourseController {
  public user = Container.get(CourseService);

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCoursesData: ICourses[] = await this.user.findAll();

      res.status(200).json({ data: findAllCoursesData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const findOneCourseData: ICourses = await this.user.findById(userId);

      res.status(200).json({ data: findOneCourseData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const dto: ICourses = req.body;
      const updateCourseData: ICourses = await this.user.updateData(userId, dto);

      res.status(200).json({ data: updateCourseData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: ICourses = req.body;
      const updateCourseData: ICourses = await this.user.createData(dto);

      res.status(200).json({ data: updateCourseData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public enrollStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: EnrollStudentDto = req.body;
      const updateCourseData: StudentCourseEntity = await this.user.enrollStudent(dto);

      res.status(200).json({ data: updateCourseData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public deleteData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const deleteCourseData: ICourses = await this.user.deleteData(userId);

      res.status(200).json({ data: deleteCourseData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CourseService } from '../services/course.service';
import { ICourses } from '../interfaces/courses.interface';
import { CourseActionDto } from '@/dtos/enroll-student.dto';
import { StudentCourseEntity } from '@/entities/studentCourses.entity';
import { QueryDto } from '@/dtos/query.dto';

export class CourseController {
  public user = Container.get(CourseService);

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: QueryDto = req.query as unknown as QueryDto;
      const { data, total }: { data: ICourses[]; total: number } = await this.user.findAll(dto);

      res.status(200).json({ data: data, total, message: 'success' });
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
      const dto: CourseActionDto = req.body;
      const updateCourseData: StudentCourseEntity = await this.user.enrollStudent(dto);

      res.status(200).json({ data: updateCourseData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public withdrawStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: CourseActionDto = req.body;
      const updateCourseData: [] = await this.user.withdrawStudent(dto);

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

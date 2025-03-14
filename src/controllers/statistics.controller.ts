import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ICourses } from '../interfaces/courses.interface';
import { StatisticsService } from '@/services/statistics.service';

export class StatisticsController {
  public user = Container.get(StatisticsService);

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCoursesData: ICourses[] = await this.user.getStatistics();

      res.status(200).json({ data: findAllCoursesData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

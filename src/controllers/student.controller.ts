import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { StudentService } from '../services/student.service';
import { Istudent } from '../interfaces/students.interface';
import { QueryDto } from '@/dtos/query.dto';

export class StudentController {
  public user = Container.get(StudentService);

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: QueryDto = req.query as unknown as QueryDto;
      const { data, total }: { data: Istudent[]; total: number } = await this.user.findAll(dto);

      res.status(200).json({ data: data, total, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const findOneStudentData: Istudent = await this.user.findById(userId);

      res.status(200).json({ data: findOneStudentData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const dto: Istudent = req.body;
      const updateStudentData: Istudent = await this.user.updateData(userId, dto);

      res.status(200).json({ data: updateStudentData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: Istudent = req.body;
      const updateStudentData: Istudent = await this.user.createData(dto);

      res.status(200).json({ data: updateStudentData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public deleteData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const deleteStudentData: Istudent = await this.user.deleteData(userId);

      res.status(200).json({ data: deleteStudentData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

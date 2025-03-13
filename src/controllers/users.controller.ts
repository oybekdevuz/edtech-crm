import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Admin } from '@interfaces/users.interface';
import { AdminService } from '@services/users.service';

export class AdminController {
  public user = Container.get(AdminService);

  public getAdmins = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAdminsData: Admin[] = await this.user.findAllAdmin();

      res.status(200).json({ data: findAllAdminsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAdminById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneAdminData: Admin = await this.user.findAdminById(userId);

      res.status(200).json({ data: findOneAdminData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: Admin = req.body;
      const createAdminData: Admin = await this.user.createAdmin(userData);

      res.status(201).json({ data: createAdminData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: Admin = req.body;
      const updateAdminData: Admin = await this.user.updateAdmin(userId, userData);

      res.status(200).json({ data: updateAdminData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteAdminData: Admin = await this.user.deleteAdmin(userId);

      res.status(200).json({ data: deleteAdminData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

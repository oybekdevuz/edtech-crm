import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { IAdmin } from '@/interfaces/admins.interface';
import { AdminService } from '@services/users.service';

export class AdminController {
  public user = Container.get(AdminService);

  public getAdmins = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAdminsData: IAdmin[] = await this.user.findAllAdmin();

      res.status(200).json({ data: findAllAdminsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAdminById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneAdminData: IAdmin = await this.user.findAdminById(userId);

      res.status(200).json({ data: findOneAdminData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IAdmin = req.body;
      const createAdminData: IAdmin = await this.user.createAdmin(userData);

      res.status(201).json({ data: createAdminData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: IAdmin = req.body;
      const updateAdminData: IAdmin = await this.user.updateAdmin(userId, userData);

      res.status(200).json({ data: updateAdminData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const deleteAdminData: IAdmin = await this.user.deleteAdmin(userId);

      res.status(200).json({ data: deleteAdminData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

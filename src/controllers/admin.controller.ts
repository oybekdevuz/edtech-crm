import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { IAdmin } from '@/interfaces/admins.interface';
import { AdminService } from '@/services/admin.service';

export class AdminController {
  public user = Container.get(AdminService);

  public getAdmins = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAdminsData: IAdmin[] = await this.user.findAllAdmin();

      res.status(200).json({ data: findAllAdminsData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public getAdminById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const findOneAdminData: IAdmin = await this.user.findAdminById(userId);

      res.status(200).json({ data: findOneAdminData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public updateAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const userData: IAdmin = req.body;
      const updateAdminData: IAdmin = await this.user.updateAdmin(userId, userData);

      res.status(200).json({ data: updateAdminData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.params.id;
      const deleteAdminData: IAdmin = await this.user.deleteAdmin(userId);

      res.status(200).json({ data: deleteAdminData, message: 'success' });
    } catch (error) {
      next(error);
    }
  };
}

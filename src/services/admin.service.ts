import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { AdminEntity } from '@/entities/admins.entity';
import { HttpException } from '@/exceptions/httpException';
import { IAdmin } from '@/interfaces/admins.interface';

@Service()
@EntityRepository()
export class AdminService extends Repository<AdminEntity> {
  public async findAllAdmin(): Promise<IAdmin[]> {
    const users: IAdmin[] = await AdminEntity.find();
    return users;
  }

  public async findAdminById(userId: string): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminEntity.findOne({ where: { id: userId } });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    return findAdmin;
  }

  public async updateAdmin(userId: string, userData: IAdmin): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminEntity.findOne({ where: { id: userId } });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");
    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData.password = hashedPassword;
    }
    await AdminEntity.update(userId, userData);

    const updateAdmin: IAdmin = await AdminEntity.findOne({ where: { id: userId } });
    return updateAdmin;
  }

  public async deleteAdmin(userId: string): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminEntity.findOne({ where: { id: userId } });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    await AdminEntity.delete({ id: userId });
    return findAdmin;
  }
}

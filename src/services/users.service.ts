import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';
import { AdminEntity } from '@entities/users.entity';
import { HttpException } from '@/exceptions/httpException';
import { Admin } from '@interfaces/users.interface';

@Service()
@EntityRepository()
export class AdminService extends Repository<AdminEntity> {
  public async findAllAdmin(): Promise<Admin[]> {
    const users: Admin[] = await AdminEntity.find();
    return users;
  }

  public async findAdminById(userId: number): Promise<Admin> {
    const findAdmin: Admin = await AdminEntity.findOne({ where: { id: userId } });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    return findAdmin;
  }

  public async createAdmin(userData: Admin): Promise<Admin> {
    const findAdmin: Admin = await AdminEntity.findOne({ where: { username: userData.username } });
    if (findAdmin) throw new HttpException(409, `This username ${userData.username} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createAdminData: Admin = await AdminEntity.create({ ...userData, password: hashedPassword }).save();

    return createAdminData;
  }

  public async updateAdmin(userId: number, userData: Admin): Promise<Admin> {
    const findAdmin: Admin = await AdminEntity.findOne({ where: { id: userId } });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await AdminEntity.update(userId, { ...userData, password: hashedPassword });

    const updateAdmin: Admin = await AdminEntity.findOne({ where: { id: userId } });
    return updateAdmin;
  }

  public async deleteAdmin(userId: string): Promise<Admin> {
    const findAdmin: Admin = await AdminEntity.findOne({ where: { id: userId } });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    await AdminEntity.delete({ id: userId });
    return findAdmin;
  }
}

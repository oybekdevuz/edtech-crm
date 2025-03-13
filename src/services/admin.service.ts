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

  public async findAdminById(userId: number): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminEntity.findOne({ where: { id: userId } });
    if (!findAdmin) throw new HttpException(409, "IAdmin doesn't exist");

    return findAdmin;
  }

  public async createAdmin(userData: IAdmin): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminEntity.findOne({ where: { username: userData.username } });
    if (findAdmin) throw new HttpException(409, `This username ${userData.username} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createAdminData: IAdmin = await AdminEntity.create({ ...userData, password: hashedPassword }).save();

    return createAdminData;
  }

  public async updateAdmin(userId: number, userData: IAdmin): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminEntity.findOne({ where: { id: userId } });
    if (!findAdmin) throw new HttpException(409, "IAdmin doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await AdminEntity.update(userId, { ...userData, password: hashedPassword });

    const updateAdmin: IAdmin = await AdminEntity.findOne({ where: { id: userId } });
    return updateAdmin;
  }

  public async deleteAdmin(userId: string): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminEntity.findOne({ where: { id: userId } });
    if (!findAdmin) throw new HttpException(409, "IAdmin doesn't exist");

    await AdminEntity.delete({ id: userId });
    return findAdmin;
  }
}

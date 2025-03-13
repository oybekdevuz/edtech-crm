import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { SECRET_KEY } from '@config';
import { AdminEntity } from '@/entities/admins.entity';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Admin } from '@interfaces/users.interface';

const createToken = (user: Admin): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const secretKey: string = SECRET_KEY;
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
@EntityRepository()
export class AuthService extends Repository<AdminEntity> {
  public async signup(userData: Admin): Promise<Admin> {
    const findAdmin: Admin = await AdminEntity.findOne({ where: { username: userData.username } });
    if (findAdmin) throw new HttpException(409, `This username ${userData.username} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createAdminData: Admin = await AdminEntity.create({ ...userData, password: hashedPassword }).save();
    return createAdminData;
  }

  public async login(userData: Admin): Promise<{ cookie: string; findAdmin: Admin }> {
    const findAdmin: Admin = await AdminEntity.findOne({ where: { username: userData.username } });
    if (!findAdmin) throw new HttpException(409, `This username ${userData.username} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findAdmin.password);
    if (!isPasswordMatching) throw new HttpException(409, `Password not matching`);

    const tokenData = createToken(findAdmin);
    const cookie = createCookie(tokenData);

    return { cookie, findAdmin };
  }

  public async logout(userData: Admin): Promise<Admin> {
    const findAdmin: Admin = await AdminEntity.findOne({ where: { username: userData.username, password: userData.password } });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    return findAdmin;
  }
}

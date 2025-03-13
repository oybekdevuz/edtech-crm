import { compare, hash } from 'bcrypt';
import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { AdminEntity } from '@/entities/admins.entity';
import { HttpException } from '@/exceptions/httpException';
import { ITokens, TokenData } from '@interfaces/auth.interface';
import { IAdmin } from '@/interfaces/admins.interface';
import { JwtService } from '@/utils/jwt-token';
import { ACCESS_SECRET_TIME } from '@/config';

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${ACCESS_SECRET_TIME};`;
};

@Service()
@EntityRepository()
export class AuthService extends Repository<AdminEntity> {
  public async signup(dto: IAdmin): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminEntity.findOne({ where: { username: dto.username } });
    if (findAdmin) throw new HttpException(409, `This username ${dto.username} already exists`);

    const hashedPassword = await hash(dto.password, 10);
    const createAdminData: IAdmin = await AdminEntity.create({ ...dto, password: hashedPassword }).save();
    return createAdminData;
  }

  public async login(dto: IAdmin): Promise<{ cookie: string; findAdmin: IAdmin; tokens: ITokens }> {
    const findAdmin: IAdmin = await AdminEntity.findOne({ where: { username: dto.username } });
    if (!findAdmin) throw new HttpException(409, `This username ${dto.username} was not found`);

    const isPasswordMatching: boolean = await compare(dto.password, findAdmin.password);
    if (!isPasswordMatching) throw new HttpException(409, `Password not matching`);
    const jwtService = new JwtService();
    const tokenData = jwtService.createToken({ id: findAdmin.id, username: findAdmin.username });
    const cookie = createCookie({ token: tokenData.access_token });

    return { cookie, findAdmin, tokens: tokenData };
  }

  public async logout(dto: IAdmin): Promise<IAdmin> {
    const findAdmin: IAdmin = await AdminEntity.findOne({ where: { username: dto.username, password: dto.password } });
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist");

    return findAdmin;
  }
}

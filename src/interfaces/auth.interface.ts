import { Request } from 'express';
import { IAdmin } from '@/interfaces/admins.interface';

export interface DataStoredInToken {
  id: string;
  username: string;
}

export interface TokenData {
  token: string;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface RequestWithAdmin extends Request {
  user: IAdmin;
}

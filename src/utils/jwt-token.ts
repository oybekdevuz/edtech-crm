import { ACCESS_SECRET_KEY, ACCESS_SECRET_TIME, REFRESH_SECRET_KEY, REFRESH_SECRET_TIME } from '@/config';
import { DataStoredInToken, ITokens } from '@/interfaces/auth.interface';
import { sign, verify } from 'jsonwebtoken';

export class JwtService {
  private readonly accessSecretKey: string;
  private readonly refreshSecretKey: string;
  private readonly accessExpiresIn: string;
  private readonly refreshExpiresIn: string;

  constructor() {
    this.accessSecretKey = ACCESS_SECRET_KEY;
    this.refreshSecretKey = REFRESH_SECRET_KEY;
    this.accessExpiresIn = ACCESS_SECRET_TIME;
    this.refreshExpiresIn = REFRESH_SECRET_TIME;
  }

  createToken(payload: DataStoredInToken): ITokens {
    const dataStoredInToken: DataStoredInToken = payload;
    const access_token = sign(dataStoredInToken, this.accessSecretKey, { expiresIn: this.accessExpiresIn });
    const refresh_token = sign(dataStoredInToken, this.refreshSecretKey, { expiresIn: this.refreshExpiresIn });
    return { access_token, refresh_token };
  }

  validateAccessToken(token: string) {
    const payload: DataStoredInToken = verify(token, ACCESS_SECRET_KEY) as DataStoredInToken;
    return payload;
  }

  validateRefreshToken(token: string) {
    const payload: DataStoredInToken = verify(token, REFRESH_SECRET_KEY) as DataStoredInToken;
    return payload;
  }
}

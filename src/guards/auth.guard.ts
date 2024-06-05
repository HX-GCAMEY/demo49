import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwY2JkY2U3ZC03ZjJiLTRkNWYtYjk0NC05N2ExNzExMWJjNGQiLCJpZCI6IjBjYmRjZTdkLTdmMmItNGQ1Zi1iOTQ0LTk3YTE3MTExYmM0ZCIsImVtYWlsIjoiZmFicml6aW9AZ21haWwuY29tIiwiaWF0IjoxNzExMzcyODU2LCJleHAiOjE3MTEzNzY0NTZ9.eHI1B90-zaLKbtNeTVJ6VVwSA3zP0gAM1Lajv_7ioh8
    const token = request.headers['authorization']?.split(' ')[1] ?? '';
    console.log({ token });

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      request.user = payload;
      console.log({ payload });
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}

import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { IsstaffGuard } from './isstaff.guard';

describe('IsstaffGuard', () => {
  it('should be defined', () => {
    expect(new IsstaffGuard(new AuthGuard(new JwtService()))).toBeDefined();
  });
});

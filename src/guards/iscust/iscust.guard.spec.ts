import { UtilService } from 'src/util/util.service';
import { IsCustGuard } from './iscust.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';

describe('IscustGuard', () => {
  it('should be defined', () => {
    expect(new IsCustGuard(new AuthGuard(new JwtService()), new UtilService())).toBeDefined();
  });
});

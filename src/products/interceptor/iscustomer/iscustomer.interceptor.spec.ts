import { UtilService } from 'src/util/util.service';
import { IscustomerInterceptor } from './iscustomer.interceptor';

describe('IscustomerInterceptor', () => {
  it('should be defined', () => {
    expect(new IscustomerInterceptor(new UtilService())).toBeDefined();
  });
});

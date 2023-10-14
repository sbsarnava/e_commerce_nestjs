import { UtilService } from 'src/util/util.service';
import { IscustomerCartInterceptor } from './iscustomer.interceptor';

describe('IscustomerInterceptor', () => {
  let utilService: UtilService;

  beforeEach(() => {
    utilService = new UtilService();
  });

  it('should be defined', () => {
    expect(new IscustomerCartInterceptor(utilService)).toBeDefined();
  });

  describe('intercept()', () => {
    it('should not return cost price when Customer is logged in', () => {
        
    });
  });
});

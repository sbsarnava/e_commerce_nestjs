import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UtilService } from 'src/util/util.service';
import { USER_ROLE } from 'src/models/user-jwt.model';

@Injectable()
export class IsCustGuard implements CanActivate {
    constructor(private authGuard: AuthGuard, private utilService: UtilService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isAuthenticated = await this.authGuard.canActivate(context);
        const user = this.utilService.getUserFromContext(context);
        if (!user) {
            throw new UnauthorizedException('User not authorized 2');
        }
        const isStaff = user.role && user.role === USER_ROLE.customer ? true : false;
        if (isStaff) {
            return true;
        } else {
            throw new UnauthorizedException();
        }
    }
}

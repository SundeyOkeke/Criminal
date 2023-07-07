import { ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/user/auth.service';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private readonly userService;
    constructor(userService: AuthService);
    canActivate(context: ExecutionContext): Promise<any>;
}
export {};

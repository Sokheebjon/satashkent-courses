import { Controller, UseGuards } from "@nestjs/common";
import { AuthService } from "@shared/modules/auth";
import { PublicRoute } from "@shared/decorators/public-route.decorator";
import { Body, Req, Res } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { AuthDto, RegisterDto } from "./dto/auth.dto";
import { UserService } from '@shared/modules/users/user.service';
import { TransactionService } from "@shared/database/transaction.service";
import { PasswordService } from "@shared/modules/auth/passwords/password.service";
import { JwtService } from "@nestjs/jwt";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly transaction: TransactionService,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService
    ) {}

    @PublicRoute()
    @Post('login')
    @ApiOkResponse({ description: 'Login successful' })
    async login(@Body() dto: AuthDto, @Req() req, @Res() response) {
        const sessionParams = {
            device: req.device,
            ip: req.headers['x-real-ip'],
            activeAt: new Date(),
            loginAt: new Date(),
        };

        const admin = await this.userService.findOneError({ login: dto.login });

        const token = await this.authService.authAdmin({
            adminId: admin._id,
            params: sessionParams,
            password: dto.password,
        });

        response.cookie('auth_token', token);

        return response.send({
            user: admin,
            token,
        });
    }

    @PublicRoute()
    @Post('register')
    @ApiOkResponse({ description: 'Register successful' })
    async register(@Body() dto: RegisterDto, @Req() req, @Res() response){
        const result = await this.transaction.execute(async (session) => {
            const createdUser = await this.userService.create(dto, { session });
            const user = await this.userService.findByIdError(createdUser._id, {
              session,
            });
      
            await this.passwordService.save(
              dto.password,
              { userId: user._id },
              { session },
            );
      
            const params = {
              userId: user._id,
            };
      
            const token = this.jwtService.sign(params);
            return {
              user: user,
              token: token,
            };
        });

        response.cookie('auth_token', result.token);

        return response.send({
            user: result.user,
            token: result.token,
        });
    }
}

import { Controller, UseGuards, Get } from "@nestjs/common";
import { RolesGuard } from "../role/role.guard";
import { AuthService } from "@shared/modules/auth";
import { PublicRoute } from "@shared/decorators/public-route.decorator";
import { Body, Req, Res } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { AdminService } from "../admins/admin.service";
import { AuthDto } from "./dto/auth.dto";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { SessionService } from "@shared/modules/auth/session/session.service";

@ApiTags('Auth')
@UseGuards(RolesGuard)
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly adminService: AdminService,
        private readonly sessionService: SessionService
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

        const admin = await this.adminService.findOneError({ login: dto.login });

        const token = await this.authService.authAdmin({
            adminId: admin._id,
            params: sessionParams,
            password: dto.password,
        });

        response.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return response.send({
            user: admin,
            token,
        });
    }

    @ApiBearerAuth()
    @Get('me')
    @ApiOkResponse({ description: 'Get current admin profile' })
    async getProfile(@Req() req) {
        const user = req.user;
        
        if (!user || !user.adminId) {
            return { message: 'Not authenticated' };
        }

        const admin = await this.adminService.findById(user.adminId);
        return admin;
    }

    @ApiBearerAuth()
    @Post('logout')
    @ApiOkResponse({ description: 'Logout successful' })
    async logout(@Req() req, @Res() response) {
        const user = req.user;

        if (user && user.sessionId) {
            // Soft delete the session by marking it as deleted
            await this.sessionService.deleteById(user.sessionId);
        }

        response.clearCookie('auth_token');

        return response.send({
            message: 'Logged out successfully'
        });
    }

}

import { Module } from "@nestjs/common";
import { DatabaseModule } from "@shared";
import { AuthGuard, AuthModule } from "@shared/modules/auth";
import { JwtService } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthController } from "./auth.controller";
import { UserDocument, UserSchema } from "@shared/modules/users/user.schema";
import { UserRepository } from "@shared/modules/users/user.repository";
import { UserService } from "@shared/modules/users/user.service";


@Module({
    imports: [
        AuthModule,
        DatabaseModule,
        DatabaseModule.forFeature([
            {
                name: UserDocument.name,
                schema: UserSchema,
            }
        ])
    ],
    controllers: [AuthController],
    providers: [
        JwtService,
        UserService,
        UserRepository,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class UserAuthModule {}
import { Module } from "@nestjs/common";
import { DatabaseModule, LoggerModule } from "@shared";
import { AuthGuard, AuthModule } from "@shared/modules/auth";
import { AdminDocument, AdminSchema } from "../admins/admin.schema";
import { AdminService } from "../admins/admin.service";
import { AdminRepository } from "../admins/admin.repository";
import { APP_GUARD } from "@nestjs/core";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        LoggerModule,
        AuthModule,
        DatabaseModule,
        DatabaseModule.forFeature([
            {
                name: AdminDocument.name,
                schema: AdminSchema,
            }
        ])
    ],
    controllers: [AuthController],
    providers: [
        AdminService,
        AdminRepository,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AdminAuthModule {}
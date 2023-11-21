import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProjectsModule } from './projects/projects.module';
import { join } from 'path';
import { TicketsModule } from './tickets/tickets.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client', 'dist'),
        }),
        PrismaModule,
        UsersModule,
        AuthModule,
        CloudinaryModule,
        ProjectsModule,
        TicketsModule,
        DashboardModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}

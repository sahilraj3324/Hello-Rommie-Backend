import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    // env config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ DB connection module
    DatabaseModule,

    // ✅ Auth module
    AuthModule,

    UsersModule,

    // ✅ Rooms module
    RoomsModule,

    // ✅ Items module
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CaseModule } from './case/case.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_HOST}:27017/csc`),
    UserModule,
    CaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

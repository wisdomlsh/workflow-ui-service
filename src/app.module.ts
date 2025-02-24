import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [LoginModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

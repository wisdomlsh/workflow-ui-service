import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { HttpModule } from '@nestjs/axios';
import { LoginController } from './login.controller';

@Module({
  controllers: [LoginController],
  imports: [HttpModule],
  providers: [LoginService],
})
export class LoginModule {}

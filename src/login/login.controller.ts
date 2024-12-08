import { Controller, Get, Query, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';

@Controller('api/github')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('/login')
  login(@Query('path') path: string) {
    return this.loginService.findAll(path);
  }

  @Get('/callback')
  callback(@Query('code') code: string, @Res() res: Response) {
    return this.loginService.callback(code, res);
  }
}

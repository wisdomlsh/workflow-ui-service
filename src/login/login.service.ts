import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class LoginService {
  constructor(private readonly httpService: HttpService) {}

  config = {
    client_id: 'Ov23liPsLb4TmVu0487p',
    client_secret: '2f88c08a3501a154388b82d986f4a693d3c48257',
  };

  redirectPath = '';

  findAll(query) {
    this.redirectPath = query;
    const dataStr = new Date().valueOf();
    const githubAuthorizeUrl = `https://github.com/login/oauth/authorize?client_id=${this.config.client_id}&state=${dataStr}`;
    return { code: 200, data: githubAuthorizeUrl, message: '' };
  }

  async callback(code: string, res: Response) {
    try {
      // 使用 code 交换 access_token
      const params = {
        client_id: this.config.client_id,
        client_secret: this.config.client_secret,
        code,
      };
      const tokenResponse = await lastValueFrom(
        this.httpService.post(
          'https://github.com/login/oauth/access_token',
          params,
          {
            headers: { Accept: 'application/json' },
          },
        ),
      );
      const accessToken = tokenResponse.data.access_token;
      // 使用 access_token 获取用户信息
      const userResponse = await lastValueFrom(
        this.httpService.get('https://api.github.com/user', {
          headers: { Authorization: `token ${accessToken}` },
        }),
      );

      const user = userResponse.data;

      // 设置 Cookies
      res.cookie('user', user.login, { httpOnly: true });
      res.cookie('icon', user.avatar_url, { httpOnly: true });
      res.cookie('ticket', accessToken, { httpOnly: true });

      // 重定向回前端页面
      res.redirect(`http://localhost:3000/home`);
    } catch (error) {
      console.log(error, 'error');
    }
  }
}

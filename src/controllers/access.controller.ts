import { UseGuards } from "@nestjs/common";
import { Body, Controller, Get, HttpCode, Post, Req, Res } from "@nestjs/common/decorators";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
import RegisterDto from "src/common/dto/register.dto";
import RequestWithUser from "src/common/interfaces/requestWithUser.interface";
import { Response } from 'express';
import { LocalAuthenticationGuard } from "src/auth/guards/localAuthentication.guard";
import JwtAuthenticationGuard from "src/auth/guards/jwt-authentication.guard";


@Controller()
export class AccessController{
    constructor(private readonly authService: AuthService, private jwtService: JwtService,) {}
    @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const {user} = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

}
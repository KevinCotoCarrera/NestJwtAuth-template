import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/Users/entities/user.entity';
import { AccessController } from 'src/controllers/access.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
//Jwt configuration
const jwtFactory = {
  useFactory: async (config: ConfigService) => {
    return {
      secret: config.get<string>('JWT_SECRET_KEY'),
      signOptions: {
        expiresIn: config.get<string | number>('JWT_SECRET_KEY_EXPIRES'),
      },
    };
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.registerAsync(jwtFactory),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  controllers:[AccessController],
  exports: [AuthService],
})
export class AuthModule {}

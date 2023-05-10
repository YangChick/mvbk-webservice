import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config/dist';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MoviesModule } from './movies/movies.module';
import { ShowTimeModule } from './show-time/show-time.module';
import { MovieTheaterController } from './movie-theater/movie-theater.controller';
import { MovieTheaterModule } from './movie-theater/movie-theater.module';
import { ShowTimeService } from './show-time/show-time.service';
import { ShowTimeController } from './show-time/show-time.controller';
import { MovieTheaterService } from './movie-theater/movie-theater.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RoleMiddleware } from './middleware/role.middleware';
import { TypeSeatModule } from './type-seat/type-seat.module';
import { SeatController } from './seat/seat.controller';
import { SeatService } from './seat/seat.service';
import { SeatModule } from './seat/seat.module';
import { MoviesService } from './movies/movies.service';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { InvoicesModule } from './invoices/invoices.module';
import { FoodService } from './food/food.service';
import { FoodController } from './food/food.controller';
import { FoodModule } from './food/food.module';
import { AWSService } from 'aws/aws.service';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        from: 'levietdat22@gmail.com',
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {
          user: 'levietdat22@gmail.com',
          pass: 'dhqrvmpajphlfrnh',
        },
      },
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '60s' },
    }),
    MoviesModule,
    ShowTimeModule,
    MovieTheaterModule,
    TypeSeatModule,
    SeatModule,
    HttpModule,
    InvoicesModule,
    FoodModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserController,
    MovieTheaterController,
    ShowTimeController,
    SeatController,
    FoodController,
  ],
  providers: [
    MailService,
    AppService,
    AuthService,
    JwtService,
    UserService,
    ShowTimeService,
    MovieTheaterService,
    SeatService,
    MoviesService,
    FoodService,
    AWSService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'movie-theater', method: RequestMethod.POST });
    consumer
      .apply(RoleMiddleware)
      .forRoutes({ path: '/movie-theater', method: RequestMethod.POST });
  }
}

// npm package
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// config
import { typeOrmAsyncConfig } from './config/orm.config';

// controllers
import { ApiModule } from './api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ApiModule,
  ],
})
export class AppModule {}

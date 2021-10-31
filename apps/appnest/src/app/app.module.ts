import {
  ProductController,
  ProductService,
} from '@fullstack-angular-nest/products';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}

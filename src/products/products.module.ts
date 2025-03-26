import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController], // ✅ Controller registrado
  providers: [ProductsService],
})
export class ProductsModule {}
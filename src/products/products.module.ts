import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AIService } from '../ia/ai.service';

@Module({
  controllers: [ProductsController], // ✅ Controller registrado
  providers: [ProductsService,AIService],
 
})
export class ProductsModule {}
// src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsString()
  @IsOptional() // Opcional
  descricao?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'O preço deve ser positivo' })
  preco: number;

  @IsNumber()
  @IsPositive()
  quantidade: number;
}
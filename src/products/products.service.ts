// src/products/products.service.ts
import { 
  Injectable, 
  NotFoundException, 
  BadRequestException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  // CREATE
  create(createProductDto: CreateProductDto): Product {
    try {
      if (!createProductDto.nome) {
        throw new BadRequestException('Nome do produto é obrigatório');
      }

      const newProduct: Product = {
        id: this.generateId(),
        ...createProductDto,
        descricao: createProductDto.descricao || 'Sem descrição',
      };

      this.products.push(newProduct);
      return newProduct;
    } catch (error) {
      throw new InternalServerErrorException('Falha ao criar produto');
    }
  }

  // READ (ALL)
  findAll(): Product[] {
    return this.products;
  }

  // READ (ONE)
  findOne(id: string): Product {
    const product = this.products.find(p => p.id === id);
    
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return product;
  }

  // UPDATE
  update(id: string, updateProductDto: UpdateProductDto): Product {
    try {
      const index = this.products.findIndex(p => p.id === id);
      
      if (index === -1) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }

      if (updateProductDto.preco && updateProductDto.preco <= 0) {
        throw new BadRequestException('Preço deve ser positivo');
      }

      const updatedProduct = {
        ...this.products[index],
        ...updateProductDto,
        id // Garante que o ID não seja alterado
      };

      this.products[index] = updatedProduct;
      return updatedProduct;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao atualizar produto');
    }
  }

  // DELETE
  delete(id: string): { message: string } {
    const initialLength = this.products.length;
    this.products = this.products.filter(p => p.id !== id);

    if (this.products.length === initialLength) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return { message: 'Produto deletado com sucesso' };
  }

  // GERADOR DE ID
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
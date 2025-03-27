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
import { AIService } from  '../ia/ai.service'; // Importe o serviço de IA

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(private readonly aiService: AIService) {} // Injeção do serviço de IA

  // CREATE (agora assíncrono)
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      if (!createProductDto.nome) {
        throw new BadRequestException('Nome do produto é obrigatório');
      }

      // Gera descrição com IA (ou mock)
      const descricao = await this.aiService.generateProductDescription(createProductDto.nome);

      const newProduct: Product = {
        id: this.generateId(),
        ...createProductDto,
        descricao: descricao || 'Sem descrição', // Usa a descrição gerada
      };

      this.products.push(newProduct);
      return newProduct;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao criar produto');
    }
  }

  // READ (ALL) - Mantido igual
  findAll(): Product[] {
    return this.products;
  }

  // READ (ONE) - Mantido igual
  findOne(id: string): Product {
    const product = this.products.find(p => p.id === id);
    
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return product;
  }

  // UPDATE - Mantido igual
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
        id
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

  // DELETE - Mantido igual
  delete(id: string): { message: string } {
    const initialLength = this.products.length;
    this.products = this.products.filter(p => p.id !== id);

    if (this.products.length === initialLength) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return { message: 'Produto deletado com sucesso' };
  }

  // GERADOR DE ID - Mantido igual
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
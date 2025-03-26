import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(product: Product): Product {
    const newProduct = { 
      id: Math.random().toString(36).substr(2, 9), // Gera um ID aleatório
      ...product 
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new Error('Produto não encontrado'); // Ou use um erro HTTP do Nest (NotFoundException)
    }
    return product;
  }
  update(id: string, updateDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    
    const updatedProduct = {
      ...product,
      ...updateDto,
      nome: updateDto.nome ?? product.nome, // Garante que nome nunca será undefined
      descricao: updateDto.descricao ?? product.descricao
    };
  
    const index = this.products.findIndex(p => p.id === id);
    this.products[index] = updatedProduct;
    
    return updatedProduct;
  }
  delete(id: string): boolean {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}
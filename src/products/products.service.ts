import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';

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

  update(id: string, updatedProduct: Product): Product {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    this.products[index] = { ...this.products[index], ...updatedProduct };
    return this.products[index];
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
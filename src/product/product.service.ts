import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as faker from 'faker';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }
  /**
   * Seed all products as faker.
   *
   * @function
   */
  createMany(): Array<Promise<Product>> {
    //Faker
    let products = [];
    const maxCount = 50;
    for (let i = 0; i <= maxCount; i++) {
      let name = faker.commerce.productName();
      let price = faker.random.number({
        min: 10,
        max: 10000,
        precision: 0.01, //Decimal
      });
      let images = faker.random.image();

      products.push({
        title: name,
        price: price,
        image: images,
      });
    }
    //Faker

    return products.map(async (product: Product) => {
      return await this.productRepository
        .findOne({ title: product.title })
        .then(async (theProduct) => {
          // We check if a product already exists.
          // If it does don't create a new one.
          if (theProduct) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.productRepository.save(product));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}

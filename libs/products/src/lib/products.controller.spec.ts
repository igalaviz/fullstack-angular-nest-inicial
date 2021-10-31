import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { Test } from '@nestjs/testing';

describe('ProductsController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProductService],
      controllers: [ProductController],
    }).compile();

    controller = module.get(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});

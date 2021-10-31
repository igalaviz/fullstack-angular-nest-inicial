import { ProductService } from './products.service';
import { Test } from '@nestjs/testing';

describe('ProductsService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

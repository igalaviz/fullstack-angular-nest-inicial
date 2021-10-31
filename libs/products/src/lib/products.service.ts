import { PrismaClient, Product } from '@prisma/client'

import { Injectable } from '@nestjs/common'

const prisma = new PrismaClient()

@Injectable()
export class ProductService {
  public getProducts(): Promise<Product[]> {
    return prisma.product.findMany()
  }
}

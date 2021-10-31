import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Product } from '@prisma/client'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:3333/api'

  constructor(private readonly http: HttpClient) {}
  public getProducts(): Observable<Product[]> {
    {
      return this.http.get<Product[]>(`${this.API_URL}/products`)
      }

    }
  }


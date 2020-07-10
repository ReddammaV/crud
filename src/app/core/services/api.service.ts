import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/product';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'http://localhost:3000/fakeUsers';


  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: number) {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

  createProduct(Product: Product) {
    let httpHeaders = new HttpHeaders()
      .set("Accept", "application/json")

    return this.http.post(this.baseUrl, Product, {
      headers: httpHeaders,
      responseType: 'json'
    });
  }

  viewProduct(id:number) {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

  updateProduct(Product: Product) {
    let httpHeaders = new HttpHeaders()
      .set("Accept", "application/json")

    return this.http.put(this.baseUrl + '/' + Product.id, Product, {
      headers: httpHeaders,
      responseType: 'json'
    });
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  // listner for refreshing (eg: for refreshing getproducts)
  private _listners = new Subject<any>();

  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
}

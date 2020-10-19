import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/model/product';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getProducts()
      .subscribe(data => {
        this.products = data;
        console.log(this.products);
      });
  }

  deleteProduct(product: Product): void {
    if (confirm("Are you sure?")) {
      this.apiService.deleteProduct(product.id)
        .subscribe(data => {
          this.products = this.products.filter(u => u !== product);
        })
    }
  };

  editProduct(product: Product): void {
    localStorage.removeItem("editProductId");
    localStorage.setItem("editProductId", product.id.toString());
    // this.router.navigate(["/edit-product"]);
  };


}

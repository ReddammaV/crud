import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/core/model/product';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-multidialog',
  templateUrl: './multidialog.component.html',
  styleUrls: ['./multidialog.component.scss']
})
export class MultidialogComponent implements OnInit {

  products: Product[];
  modalRef: BsModalRef;


  constructor(private router: Router,
    private apiService: ApiService,
    private modalService: BsModalService) {
    this.apiService.listen().subscribe((data) => {
      console.log(data);
      this.getProducts();
    })
  }

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
    // localStorage.removeItem("editProductId");
    // localStorage.setItem("editProductId", product.id.toString());
    // let myid = this.apiService.getProductById(product.id);
    // console.log(product.id);
    const initialState = { productid: product.id, productfirstname: product.firstName, productlastname: product.lastName, productemail: product.email };
    this.modalRef = this.modalService.show(DialogComponent, {initialState});
};

// modal
openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}

  // openMultiDialog()
  openMultiDialog(){
  this.modalRef = this.modalService.show(DialogComponent);
}

}

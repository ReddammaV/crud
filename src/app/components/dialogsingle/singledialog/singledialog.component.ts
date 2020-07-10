import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/core/model/product';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-singledialog',
  templateUrl: './singledialog.component.html',
  styleUrls: ['./singledialog.component.scss']
})
export class SingledialogComponent implements OnInit {
  products: Product[];
  modalRef: BsModalRef;
  addForm: FormGroup;
  message = "Save";
  employeeIdToUpdate = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getProducts();
    // setForm
    this.setForm();
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

  editProduct(id: number, template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    this.apiService.getProductById(id).subscribe(product => {
      this.message = 'UPDATE';
      this.employeeIdToUpdate = product.id;
      this.addForm.controls['firstName'].setValue(product.firstName);
      this.addForm.controls['lastName'].setValue(product.lastName);
      this.addForm.controls['email'].setValue(product.email);
    })
  };

  // modal
  openModal(template: TemplateRef<any>) {
    this.addForm.reset();
    this.message = 'Save';
    this.modalRef = this.modalService.show(template);
  }

  // setForm
  setForm() {
    this.addForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  // on form submit
  onSubmit() {
    if (this.addForm.invalid) {
      return;
    } else {
      let product = this.addForm.value;
      this.createProduct(product);
      this.addForm.reset();
    }
  }

  // createProduct
  createProduct(product: Product) {
    if (this.employeeIdToUpdate == null) {
      this.addForm.reset();
      this.apiService.createProduct(product).subscribe(
        () => {
          this.message = 'Save';
          this.modalRef.hide();
          this.getProducts();
          this.employeeIdToUpdate = null;
          this.addForm.reset();
        }
      )
    } else {
      product.id = this.employeeIdToUpdate;
      this.apiService.updateProduct(product).subscribe(
        () => {
          this.message = 'Update';
          this.modalRef.hide();
          this.getProducts();
          this.employeeIdToUpdate = null;
          this.addForm.reset();
        }
      )
    }
  }

}

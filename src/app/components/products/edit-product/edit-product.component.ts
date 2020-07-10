import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Location } from '@angular/common';
import { Product } from 'src/app/core/model/product';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: Product;
  message: string;
  employeeIdToUpdate = null;
  id: number;
  myProduct: any;
  editForm: FormGroup;

  constructor(private _location: Location, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    // editForm
    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    // getById
    this.getEmployeeById(this.id);
  }

  // getById
  getEmployeeById(id) {
    this.apiService.getProductById(id)
      .subscribe(
        data => {
          this.myProduct = data;
          this.employeeIdToUpdate = data.id;
          console.log(data);
          console.log(this.employeeIdToUpdate, 'employeeIdToUpdate');
          this.myProduct.email = this.editForm.controls['email'].setValue(data.email);
          this.myProduct.firstName = this.editForm.controls['firstName'].setValue(data.firstName);
          this.myProduct.lastName = this.editForm.controls['lastName'].setValue(data.lastName);
        });
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    } else {
      let product = this.editForm.value;
      this.createProduct(product);
      this.editForm.reset();
    }
  }

  // createEmployee
  createProduct(product: Product) {
    product.id = this.employeeIdToUpdate;
    console.log(product.id);
    console.log('edit');
    console.log(this.id);
    console.log(product, 'edit');
    this.apiService.updateProduct(product).subscribe(
      () => {
        console.log("edited");
        this.employeeIdToUpdate = null;
        this.router.navigate(['myproducts']);
        this.editForm.reset();
      }
    )
  }

  backClicked() {
    this._location.back();
  }

}

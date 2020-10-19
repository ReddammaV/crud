import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../../../core/model/product';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-myproduct',
  templateUrl: './myproduct.component.html',
  styleUrls: ['./myproduct.component.scss']
})
export class MyproductComponent implements OnInit {
  product: Product;
  addForm: FormGroup;
  message: string;
  employeeIdToUpdate = null;
  id: number;
  myProduct: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }


  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.message = this.id === 0 ? 'Add Product' : 'Edit Product';

    // setForm
    this.setForm();

    if (this.id === 0) {
      return
    } else {
      // this.getEmployee(this.route.snapshot.paramMap.get('id'));
      this.getEmployeeById(this.id);
    }
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
          this.myProduct.email = this.addForm.controls['email'].setValue(data.email);
          this.myProduct.firstName = this.addForm.controls['firstName'].setValue(data.firstName);
          this.myProduct.lastName = this.addForm.controls['lastName'].setValue(data.lastName);
        });
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

  // createEmployee
  createProduct(product: Product) {
    if (this.employeeIdToUpdate == null) {
      console.log(product, 'add');

      this.apiService.createProduct(product).subscribe(
        () => {
          console.log("Created");
          this.employeeIdToUpdate = null;
          this.router.navigate(['myproducts']);
          this.resetForm();
        }
      )
    } else {
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
          this.resetForm();
        }
      )
    }
  }


  // resetform
  resetForm() {
    this.addForm.reset();
  }




}

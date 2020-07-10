import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from 'src/app/core/services/api.service';
import { Product } from 'src/app/core/model/product';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-myproduct',
  templateUrl: './myproduct.component.html',
  styleUrls: ['./myproduct.component.scss']
})
export class MyproductComponent implements OnInit {
  product: Product;
  addForm: FormGroup;
  myproductId = null;
  productId = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }


  ngOnInit() {
    this.productId = localStorage.getItem("editProductId");
    console.log(this.productId);


    // setForm
    this.setForm();

    // getById
    this.getById();
    
  }

  // getById
  getById(){
    if(this.productId != 0){
    this.myproductId = this.apiService.getProductById(+this.productId)
      .subscribe(data => {
        this.addForm.setValue(data);
      });
    } else {
      console.log("nothing id");
    }
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

  onSubmit() {
    if(this.productId == 0){    
      console.log("add");  
      this.apiService.createProduct(this.addForm.value)
      .subscribe(data => {
        this.addForm.reset();
        this.productId = null;
        this.router.navigate(['myproducts']);
        console.log("Hello2");
      });
    } else {
      console.log("edit");
      this.apiService.updateProduct(this.addForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['myproducts']);
          this.productId = null;
          this.addForm.reset();
        },
        error => {
          alert(error);
        });
    }
  }

  

}

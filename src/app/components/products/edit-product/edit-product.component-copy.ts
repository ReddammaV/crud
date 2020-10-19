import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { Location } from '@angular/common';
import { Product } from '../../../core/model/product';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {


  product: Product;
  editForm: FormGroup;
  constructor(private _location: Location, private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let productId = localStorage.getItem("editProductId");
    console.log(productId);
    if(!productId) {
      alert("Invalid action.")
      this.router.navigate(['products']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.apiService.getProductById(+productId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.apiService.updateProduct(this.editForm.value)
      .subscribe(
        data => {
          this.router.navigate(['products']);
        },
        error => {
          alert(error);
        });
  }

  backClicked() {
    this._location.back();
  }

}

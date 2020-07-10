import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from 'src/app/core/services/api.service';
import { Product } from 'src/app/core/model/product';
import { first } from "rxjs/operators";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  product: Product;
  addForm: FormGroup;
  message: string;
  employeeIdToUpdate = null;
  id: number;
  myProduct: any;
  modalRef: BsModalRef;
  // from modaldialog 
  productid: any;
  productfirstname: any;
  productlastname: any;
  productemail: any;

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private apiService: ApiService,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef) { }

  ngOnInit() {
    // this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.productid);
    this.message = this.productid === undefined ? 'Add Product' : 'Edit Product';

    // setForm
    this.setForm();

    // if (this.id === 0) {
    //   return
    // } else {
    //   // this.getEmployee(this.route.snapshot.paramMap.get('id'));
    //   this.getEmployeeById(this.id);
    // }

    this.productid = this.addForm.controls['id'].setValue(this.productid);
    this.employeeIdToUpdate = this.productid;
    this.productemail = this.addForm.controls['email'].setValue(this.productemail);
    this.productfirstname = this.addForm.controls['firstName'].setValue(this.productfirstname);
    this.productlastname = this.addForm.controls['lastName'].setValue(this.productlastname);
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
    this.productid = this.employeeIdToUpdate;
    if (this.productid === undefined) {
      console.log(product, 'add');
      this.productid = this.employeeIdToUpdate;

      this.apiService.createProduct(product).subscribe(
        () => {
          console.log("Created");
          this.employeeIdToUpdate = null;
          this.doHide();
          this.router.navigateByUrl('multidialog');
          this.resetForm();
        }
      )
    } 

    // for edit
    if(this.employeeIdToUpdate == null) {
      this.productid = this.employeeIdToUpdate;
      console.log(this.productid);
      console.log('edit');
      console.log(this.id);
      console.log(product, 'edit');
      this.apiService.updateProduct(product).subscribe(
        () => {
          console.log("edited");
          this.employeeIdToUpdate = null;
          this.router.navigate(['multidialog']);
          this.resetForm();
          this.doHide();
        }
      )
    }
  }


  // resetform
  resetForm() {
    this.addForm.reset();
  }

  // for modal hide
  doHide() {
    this.bsModalRef.hide();
    this.apiService.filter('Click');
  }




}

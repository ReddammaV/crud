import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MyproductsRoutingModule } from './myproducts-routing.module';
import { MyproductsComponent } from './myproducts.component';
import { MyproductComponent } from './myproduct/myproduct.component';
import { MyproductViewComponent } from './myproduct-view/myproduct-view.component';

@NgModule({
  declarations: [MyproductsComponent, MyproductComponent, MyproductViewComponent],
  imports: [
    CommonModule,
    MyproductsRoutingModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class MyproductsModule { }

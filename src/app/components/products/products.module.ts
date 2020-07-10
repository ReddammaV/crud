import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewProductComponent } from './view-product/view-product.component';

@NgModule({
  declarations: [ProductsComponent, AddProductComponent, EditProductComponent, ViewProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class ProductsModule { }

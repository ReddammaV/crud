import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyproductsComponent } from './myproducts.component';
import { MyproductComponent } from './myproduct/myproduct.component';
import { MyproductViewComponent } from './myproduct-view/myproduct-view.component';

const routes: Routes = [
  {path: '', component: MyproductsComponent},
  {path: 'myproduct-add', component: MyproductComponent},
  {path: 'myproduct-edit/:id', component: MyproductComponent},
  {path: 'myproduct-view/:id', component: MyproductViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyproductsRoutingModule { }

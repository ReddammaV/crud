import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'myproducts',
    loadChildren: () => import('./components/myproducts/myproducts.module').then(m => m.MyproductsModule),
  },
  {
    path: 'singledialog',
    loadChildren: () => import('./components/dialogsingle/dialogsingle.module').then(m => m.DialogsingleModule),
  },
  {
    path: 'multidialog',
    loadChildren: () => import('./components/multidialog/multidialog.module').then(m => m.MultidialogModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

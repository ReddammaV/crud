import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingledialogComponent } from './singledialog/singledialog.component';

const routes: Routes = [
  {path:'', component: SingledialogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogsingleRoutingModule { }

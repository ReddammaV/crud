import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultidialogComponent } from './multidialog.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogViewComponent } from './dialog-view/dialog-view.component';

const routes: Routes = [
  {path: '', component: MultidialogComponent},
  {path: 'dialog-add', component: DialogComponent},
  {path: 'dialog-edit/:id', component: DialogComponent},
  {path: 'dialog-view/:id', component: DialogViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultidialogRoutingModule { }

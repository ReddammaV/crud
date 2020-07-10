import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MultidialogRoutingModule } from './multidialog-routing.module';
import { MultidialogComponent } from './multidialog.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogViewComponent } from './dialog-view/dialog-view.component';

@NgModule({
  declarations: [MultidialogComponent, DialogComponent, DialogViewComponent],
  imports: [
    CommonModule,
    MultidialogRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    ModalModule.forRoot()
  ],
  entryComponents: [
    MultidialogComponent,
    DialogComponent
  ]
})
export class MultidialogModule { }

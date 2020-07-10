import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DialogsingleRoutingModule } from './dialogsingle-routing.module';
import { SingledialogComponent } from './singledialog/singledialog.component';

@NgModule({
  declarations: [SingledialogComponent],
  imports: [
    CommonModule,
    DialogsingleRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class DialogsingleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { InputDialogComponent } from './input-dialog/input-dialog.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { NgbToastModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ToastComponent,
    ConfirmDialogComponent,
    ConfirmDialogComponent,
    InputDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ToastComponent,
    ConfirmDialogComponent,
    ConfirmDialogComponent,
    InputDialogComponent,
    MessageDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    InputDialogComponent,
    MessageDialogComponent,
  ]
})
export class ComponentsModule { }

import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InputDialogComponent } from '../components/input-dialog/input-dialog.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private ngbModal: NgbModal
  ) { }

  // confirm(
  //   prompt = 'Really?', title = 'Confirm'
  // ): Observable<boolean> {
  //   const modal = this.ngbModal.open(
  //     ConfirmDialogComponent, { backdrop: 'static' });

  //   modal.componentInstance.prompt = prompt;
  //   modal.componentInstance.title = title;

  //   return from(modal.result).pipe(
  //     catchError(error => {
  //       console.warn(error);
  //       return of(undefined);
  //     })
  //   );
  // }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.ngbModal.open(ConfirmDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

  input(
    message: string, initialValue: string, title = 'Input'
  ): Observable<string> {
    const modal = this.ngbModal.open(
      InputDialogComponent, { backdrop: 'static' });

    modal.componentInstance.message = message;
    modal.componentInstance.initialValue = initialValue;
    modal.componentInstance.title = title;

    return from(modal.result).pipe(
      catchError(error => {
        console.warn(error);
        return of(undefined);
      })
    );
  }

  message(
    message: string, title = 'Message'
  ): Observable<boolean> {
    const modal = this.ngbModal.open(
      MessageDialogComponent, { backdrop: 'static' });

    modal.componentInstance.message = message;
    modal.componentInstance.title = title;

    return from(modal.result).pipe(
      catchError(error => {
        console.warn(error);
        return of(undefined);
      })
    );
  }
}

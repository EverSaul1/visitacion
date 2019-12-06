import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDialogComponent implements OnInit {
  title: string;
  set initialValue(value: string) {
    this.input.setValue(value);
  }
  message: string;
  input = new FormControl('', Validators.required);

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

}

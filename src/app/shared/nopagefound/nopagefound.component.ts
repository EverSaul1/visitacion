import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.scss']
})
export class NopagefoundComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  cancelar() {
    this.location.back();
  }

}

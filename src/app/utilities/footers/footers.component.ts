import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footers',
  templateUrl: './footers.component.html',
  styleUrls: ['./footers.component.scss']
})
export class FootersComponent implements OnInit {
  d = new Date();
  c: Number;

  constructor() { }

  ngOnInit(): void {
    this.c = this.d.getFullYear();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
secret:number = 0;
  constructor() { }

  ngOnInit(): void {
  }
addSecret(){
  this.secret += 1;
}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  name: string;
  message: string;
  constructor() { }

  ngOnInit(): void {
  }
  appendMailTo(){
    this.name = this.name;
    this.message = this.message;
  }
}

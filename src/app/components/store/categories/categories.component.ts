import { Component, OnInit } from '@angular/core';
import { FireBaseService, Iitems } from 'src/app/services/fire-base.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private firebaseService:FireBaseService) { }

  ngOnInit(): void {
  }
  passCat(cat){
    this.firebaseService.cat = cat;
  }
}

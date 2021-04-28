import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FireBaseService, Iitems } from 'src/app/services/fire-base.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  public form: FormGroup;

  public itemList: Iitems[]=[];
  public itemDetails: Iitems;

  constructor(
    private fb: FormBuilder,
    private firebaseService:FireBaseService,
    public cart: CartService
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems():void {
    this.firebaseService.getItems().subscribe((res)=>{
      this.itemList = res.map((items) => {
        return{
          ...items.payload.doc.data() as {},
          id: items.payload.doc.id
        }as Iitems;
      });
    });
  }
}

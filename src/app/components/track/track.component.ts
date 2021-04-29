import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutItems, FireBaseService } from 'src/app/services/fire-base.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  public checkoutList: CheckoutItems[]=[];
  public checkoutDetails: CheckoutItems;

  constructor(private firebaseService: FireBaseService,
              public cart: CartService) { }

  ngOnInit(): void {
    this.getCheckout();
  }
  getCheckout():void {
    this.firebaseService.getCheckout().subscribe((res)=>{
      this.checkoutList = res.map((items) => {
        return{
          ...items.payload.doc.data() as {},
          id: items.payload.doc.id
        }as CheckoutItems;
      });
    });
  }
  mapCheckout(id){
    this.pending();
    return this.checkoutList.filter((item) => item.orderID === id);
  }
  pending(){
    document.getElementById('pending').style.backgroundColor = '#79BC77';
  }
}

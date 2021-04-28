import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  
  constructor(
    public cart: CartService
  ) { }

  ngOnInit(): void {
    this.cart.getCart();
  }

  cartAdd(param1):void{
    this.cart.increaseQuantity(param1);
  }

  cartMin(param1):void{
    this.cart.deductQuantity(param1);
  }
}

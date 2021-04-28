import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  
  id: number = 0;
  cartArray: any[] = [];

  addCart(param1, param2, param3): void {
    let testObject = { 'name': param1, 'price': param2, 'quantity': 1, 'id': param3};
    if(localStorage.getItem(`${param3}`) == null){
      localStorage.setItem(`${param3}`, JSON.stringify(testObject));
    } else {
      alert('already in cart')
    }
  }


  getCart(): void {
    for(let i=0; i!=localStorage.length; i++){
      let key = localStorage.key(i);
      let user = JSON.parse(localStorage.getItem(key));
      this.cartArray.push(user);
    }
  }

  clearCart(): void{
    localStorage.clear();
    this.cartArray = [];
  }

  refreshCart(): void{
    this.cartArray = [];
    for(let i=0; i!=localStorage.length; i++){
      let key = localStorage.key(i);
      let user = JSON.parse(localStorage.getItem(key));
      this.cartArray.push(user);
    }
  }

  increaseQuantity(param1): void {
    let data = JSON.parse(localStorage.getItem(`${param1}`));
    data.quantity += 1;
    localStorage.setItem(`${param1}`, JSON.stringify(data));
    this.refreshCart();
  }
  
  deductQuantity(param1):void {
    let data = JSON.parse(localStorage.getItem(`${param1}`));
    if(data.quantity>=1){
      data.quantity -= 1;
    }
    localStorage.setItem(`${param1}`, JSON.stringify(data));
    this.refreshCart();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  
  id: number = 0;
  cartArray: any[] = [];
  amount: number = 0;

  addCart(param1, param2, param3, param4): void {
    let testObject = { 'name': param1, 'price': param2, 'quantity': 1, 'id': param3, 'image': param4};
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
    this.totalAmount();
  }

  refreshCart(): void{
    this.cartArray = [];
    for(let i=0; i!=localStorage.length; i++){
      let key = localStorage.key(i);
      let user = JSON.parse(localStorage.getItem(key));
      if(key != '__fb_chat_plugin'){
        this.cartArray.push(user);
      }
    }
  }

  deleteItemCart(param1): void{
    localStorage.removeItem(`${param1}`);
    this.refreshCart();
    this.totalAmount();
  }

  increaseQuantity(param1): void {
    let data = JSON.parse(localStorage.getItem(`${param1}`));
    data.quantity += 1;
    localStorage.setItem(`${param1}`, JSON.stringify(data));
    this.refreshCart();
    this.totalAmount();
  }
  
  deductQuantity(param1):void {
    let data = JSON.parse(localStorage.getItem(`${param1}`));
    if(data.quantity>1){
      data.quantity -= 1;
      localStorage.setItem(`${param1}`, JSON.stringify(data));
    } else {
      this.deleteItemCart(param1);
    }
    this.refreshCart();
    this.totalAmount();
  }

  totalAmount(): void {
    this.amount = 0;
    let currTotal: number = 0;
    for (let i=0; i!=this.cartArray.length; i++){
      currTotal += this.cartArray[i].price * this.cartArray[i].quantity;
    }
    this.amount = currTotal;
  }
}

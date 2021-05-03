import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FireBaseService } from './fire-base.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private toastr: ToastrService,
    private firebaseService: FireBaseService) { }
  
  id: number = 0;
  cartArray: any[] = [];
  amount: number = 0;
  orderID:string;
  currTotal: number = 0;


  addCart(param1, param2, param3, param4): void {
    let testObject = { 'name': param1, 'price': param2, 'quantity': 1, 'id': param3, 'image': param4};
    if(localStorage.getItem(`${param3}`) == null){
      localStorage.setItem(`${param3}`, JSON.stringify(testObject));
      this.toastr.success(`Added in cart!`,`${param1}`)
    } else {
      this.toastr.warning(`Already in cart!`,`${param1}`)
    }
  }
  
  getCart(): void {
    this.cartArray = [];
    for(let i=0; i!=localStorage.length; i++){
      let key = localStorage.key(i);
      if(key != '__fb_chat_plugin' && key != 'order'){
        let user = JSON.parse(localStorage.getItem(key));
        this.cartArray.push(user);
      }
    }
  }

  clearCart(): void{
    let listRemove = [];
    for(let i=0; i!=localStorage.length; i++){
      let key = localStorage.key(i);
      if(key != '__fb_chat_plugin' && key != 'order'){
        listRemove.push(key)
      }
    }
    for(let i=0; i!=listRemove.length; i++){
      localStorage.removeItem(listRemove[`${i}`])
    }
    this.cartArray = [];
    this.totalAmount();
    this.toastr.info('cleared','')
    this.currTotal = 0;
    this.amount = 0;
  }

  refreshCart(): void{
    this.cartArray = [];
    this.currTotal = 0;
    this.amount = 0;
    for(let i=0; i!=localStorage.length; i++){
      let key = localStorage.key(i);
      if(key != '__fb_chat_plugin' && key != 'order'){
      let user = JSON.parse(localStorage.getItem(key));
        this.cartArray.push(user);
      }
    }
    this.totalAmount();
  }

  deleteItemCart(param1, param2): void{
    localStorage.removeItem(`${param2}`);
    this.toastr.info(`Removed!`,`${param1}`)
    this.refreshCart();
  }

  increaseQuantity(param1): void {
    let data = JSON.parse(localStorage.getItem(`${param1}`));
    data.quantity += 1;
    localStorage.setItem(`${param1}`, JSON.stringify(data));
    this.refreshCart();
  }
  
  deductQuantity(param1,param2):void {
    let data = JSON.parse(localStorage.getItem(`${param1}`));
    if(data.quantity>1){
      data.quantity -= 1;
      localStorage.setItem(`${param1}`, JSON.stringify(data));
    } else {
      this.deleteItemCart(param2, param1);
    }
    this.refreshCart();
  }

  totalAmount(): void {
    this.amount = 0;
    this.currTotal = 0;
    for (let i=0; i!=this.cartArray.length; i++){
      this.currTotal += this.cartArray[i].price * this.cartArray[i].quantity;
    }
    this.amount = this.currTotal + 50;
  }
}

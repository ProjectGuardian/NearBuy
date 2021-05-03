import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
cat:'';
  constructor(
    private firestore: AngularFirestore
  ) { 
  }

  getItems(){
    return this.firestore.collection('items').snapshotChanges();
  }
  addItems(payload: Iitems){
    return this.firestore.collection('items').add(payload);
  }
  
  updateItems(itemsId:string,payload:Iitems){
    return this.firestore.doc('items/' + itemsId).update(payload);
  }
  deleteItems(itemsId:string){
    return this.firestore.doc('items/' + itemsId).delete();
  }

  //CHECKOUT

  getCheckout(){
    return this.firestore.collection('checkout', x => x.orderBy('time','asc')).snapshotChanges();
  }
  addCheckout(payload: CheckoutItems){
    return this.firestore.collection('checkout').add(payload);
  }
  deleteCheckout(itemsId:string){
    return this.firestore.doc('checkout/' + itemsId).delete();
  }
  updateCheckout(status:CheckoutItems,itemsId:string){
    return this.firestore.doc('checkout/' + itemsId).update(status);
  }
}


export interface Iitems{
  id?:string;
  name: string;
  price: number;
  image:string;
  category:string;
}
export interface CheckoutItems{
  id?:string;
  name: string;
  number: number;
  image:string;
  address:string;
  amount:number;
  orderID:string;
  status:string;
  time:any;
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

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
}


export interface Iitems{
  id?:string;
  name: string;
  price: number;
  image:string;
  category:string;
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutItems, FireBaseService } from 'src/app/services/fire-base.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public checkoutList: CheckoutItems[]=[];
  public checkoutDetails: CheckoutItems;
  form: FormGroup;
  statusOTW:string = "On The Way";
  statusDelivered: string = "Delivered";
  constructor(private firebaseService: FireBaseService,
              private fb : FormBuilder) { }

  ngOnInit(): void {
    this.getCheckouts();
  }
  getCheckouts():void {
    this.firebaseService.getCheckout().subscribe((res)=>{
      this.checkoutList = res.map((items) => {
        return{
          ...items.payload.doc.data() as {},
          id: items.payload.doc.id
        }as CheckoutItems;
      });
    });
  }
  changeStatusOTW(data: CheckoutItems): void{
    this.form = this.fb.group({
      status: [data ? data.status: this.statusOTW]
    });
  }
  changeStatusDelivered(data:CheckoutItems):void{
    this.form = this.fb.group({
      status: [data ? data.status: this.statusDelivered]
    });
  }
  otw(itemsId: string):void{
    this.changeStatusOTW(this.checkoutDetails);
    this.firebaseService.updateCheckout(this.form.value,itemsId).then();
  }
  delivered(itemsId: string):void{
    this.changeStatusDelivered(this.checkoutDetails);
    this.firebaseService.updateCheckout(this.form.value,itemsId).then();

    setTimeout(()=>{
      this.firebaseService.deleteCheckout(itemsId).then();
    }, 5000)
  }
}

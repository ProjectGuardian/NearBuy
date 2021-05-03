import { Component, OnInit, TemplateRef } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutItems, FireBaseService } from 'src/app/services/fire-base.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  path:string;
  orderID: string;
  public form: FormGroup;
  status:string = 'Pending';
  currentTotal:number = 0;
  time = Date();

  public checkoutList: CheckoutItems[]=[];
  public checkoutDetails: CheckoutItems;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private firebaseService:FireBaseService,
    public cart: CartService,
    public af:AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cart.getCart();
    this.cart.totalAmount();
    this.getCheckouts();
    this.orderID = this.getRandomId();
    this.currentTotal = this.cart.currTotal;
  }

  cartAdd(param1):void{
    this.cart.increaseQuantity(param1);
    this.currentTotal = this.cart.currTotal;
  }

  cartMin(param1,param2):void{
    this.cart.deductQuantity(param1,param2);
    this.currentTotal = this.cart.currTotal;
  } 
  
  removeItem(param1, param2):void{
    this.cart.deleteItemCart(param1, param2);
    this.currentTotal = this.cart.currTotal;
  }
  clearCart():void{
    this.cart.clearCart();
    this.currentTotal = this.cart.currTotal;
  }


  //CHECKOUT
  upload($event){
    this.path = $event.target.files[0]
  }
  uploadImage(){
    console.log(this.path);
    this.af.upload("/files"+Math.random()+this.path,this.path)
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
  formInit(data: CheckoutItems): void{
    this.form = this.fb.group({
      name: [data ? data.name : '', Validators.required],
      image: [data ? data.image : '',Validators.required],
      address: [data ? data.address : '', Validators.required],
      amount: [data ? data.amount : ''],
      orderID: [data ? data.orderID: ''],
      status: [data ? data.status:''],
      time: [data ? data.time: ''],
      number: [data ? data.number : '',
      Validators.compose([
        Validators.required
      ])
    ]
    });
  }
  openModal(content:TemplateRef<any>, itemsId: string):void{
    this.checkoutDetails = this.checkoutList.find((items: CheckoutItems) => items.id === itemsId);

    this.formInit(this.checkoutDetails);
    this.modalService.open(content, {backdrop:'static', centered:true});
  }
  addCheckout(): void{
    this.firebaseService.addCheckout(this.form.value).then();
    this.uploadImage();
    this.cart.orderID = this.orderID;
    localStorage.setItem('order', this.orderID);
    this.cart.clearCart();
    this.router.navigate(['/track'])
  }
  deleteCheckout(itemsId:string):void{
    this.firebaseService.deleteCheckout(itemsId).then();
  }
  getRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}

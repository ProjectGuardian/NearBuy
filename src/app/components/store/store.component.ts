import { Component, OnInit, Pipe, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
 
  cp = 'cleaningProducts';
  icg = 'instantCannedGoods';
  ce = 'cookingEssentials';
  ds = 'drinksAndSnacks';
  sfc = 'selfCareProducts';
  c = 0;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public firebaseService:FireBaseService,
    public cart: CartService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getItems();
    if(this.firebaseService.cat == null){
    this.router.navigate(['/categories']);
    }
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

  openModal(content:TemplateRef<any>, itemsId: string):void{
    this.itemDetails = this.itemList.find((items: Iitems) => items.id === itemsId);

    this.formInit(this.itemDetails);
    this.modalService.open(content, {backdrop:'static', centered:true});
  }

  formInit(data: Iitems): void{
    this.form = this.fb.group({
      name: [data ? data.name : '', Validators.required],
      image: [data ? data.image : '',Validators.required],
      category: [data ? data.category : '', Validators.required],
      price: [data ? data.price : '',
      Validators.compose([
        Validators.required
      ])
    ]
    });
  }
  addItems(): void{
    this.firebaseService.addItems(this.form.value).then();
  }
  updateItems(itemsId:string):void{
    this.firebaseService.updateItems(itemsId, this.form.value).then();
  }
  deleteItems(itemsId:string):void{
    this.firebaseService.deleteItems(itemsId).then();
  }
  filterItems(type){
    if(type != '')
    return this.itemList.filter((item) => item.category === type);
    else
    return this.itemList;
  }
  count(){
    this.c ++;
    console.log(this.c);
  }
}

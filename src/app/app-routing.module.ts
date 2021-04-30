import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StoreComponent } from './components/store/store.component';
import { CategoriesComponent } from './components/store/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { TrackComponent } from './components/track/track.component';
import { OrdersComponent } from './components/orders/orders.component';


const routes: Routes = [
  { 
    path: '', component: HomeComponent, pathMatch: 'full' 
  },
  { 
    path: 'store', component: StoreComponent 
  },
  { 
    path: 'cart', component: CartComponent 
  },
  { 
    path: 'track', component: TrackComponent 
  },
  { 
    path: 'how-it-works', component: HowItWorksComponent
  },
  { 
    path: 'about-us', component: AboutUsComponent
  },
  { 
    path: 'contact-us', component: ContactUsComponent
  },
  { 
    path: 'app-store', component: StoreComponent
  },
  { 
    path: 'categories', component: CategoriesComponent
  },
  { 
    path: 'orders', component: OrdersComponent
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

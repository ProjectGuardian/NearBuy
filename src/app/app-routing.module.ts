import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SingUpComponent } from './components/authentication/sing-up/sing-up.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StoreComponent } from './components/store/store.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent, pathMatch: 'full' 
  },
  { 
    path: 'store', component: StoreComponent 
  },
  { 
    path: 'authentication',
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SingUpComponent }
    ]
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
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

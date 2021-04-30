import { Component, OnInit } from '@angular/core';
import { OutletContext, RouterOutlet } from '@angular/router';
import { FacebookService, InitParams } from "ngx-facebook";
import { transition, trigger, style, animate, query, animation, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger( 'routeAnim',[
      transition('* => *', [
        // query(':enter',[
        //   style({
        //     background: 'wheat',
        //     display: 'block',
        //     height: '100%'
        //   }),
        //   animate(1000, style({
        //     background: '*'
        //   }))
        // ], { optional: true }), 
        // style({
        //   background: 'blue'
        // }),
        // animate(1000)
        style({
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden'
        }),
        query(':enter, :leave ', [
          style({
            // display: 'block',
            position: 'absolute',
            top: '0',
            left: '0',
            height: '100%',
            width: '100%'
          })
        ], { optional: true }),
        group([
          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateY(100px)'
            }),
            animate('400ms ease-in', style({
              opacity: 1,
              transform: 'translateY(0)'
            }))
          ], { optional: true }),
          query(':leave', [
            animate('400ms ease-in', style({
              opacity: 0,
              transform: 'translateY(100px)'
            }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  constructor(private facebookService: FacebookService) { }
  ngOnInit(): void {
    this.initFacebookService();
  }
  private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:'v10.0'};
    this.facebookService.init(initParams);
  }

  prepareRoute(outlet: RouterOutlet) {
    if(outlet.isActivated) return outlet.activatedRoute.snapshot.url;
  }

}
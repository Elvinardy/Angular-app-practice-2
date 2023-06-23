import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localStorage.token';
import { ConfigService } from './services/config.service';
import { InitService } from './init.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
// root component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'hotelinventoryapp';

  @ViewChild('name', {static: true}) name!: ElementRef;

  constructor(@Optional() private loggerService: LoggerService,
  @Inject(localStorageToken) private localStorage : any,
  private initSvc: InitService,
  private configSvc: ConfigService,
  private router: Router) { }


  ngOnInit(): void {
/*     this.router.events.subscribe((event) => {
      console.log(event)
    }) */
    // to listen to routing events.
/*     this.router.events.pipe(
      filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log('Navigation Started!');
      });

      this.router.events.pipe(
        filter((event) => event instanceof NavigationStart))
        .subscribe((event) => {
          console.log('Navigation Completed!');
        }); */
    this.loggerService.Log('AppComponent.ngOnInit()');
    this.name.nativeElement.innerText = 'Holiday Inn'
    this.localStorage.setItem('name', 'Holiday Inn Orchard')
  }



/*   @ViewChild('user', { read: ViewContainerRef}) vcr!: ViewContainerRef;

  ngAfterViewInit() {
    const componentRef = this.vcr.createComponent(RoomsComponent);
    componentRef.instance.numberOfRooms = 50;
  } */

}

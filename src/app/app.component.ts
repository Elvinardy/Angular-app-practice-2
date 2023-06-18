import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localStorage.token';
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
  @Inject(localStorageToken) private localStorage : any) { }


  ngOnInit(): void {
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

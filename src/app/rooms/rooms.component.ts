import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  hotelName = 'Holiday Inn';
  numberOfRooms = 101;
  hideRooms = true;
  title = 'Room List';

  selectedRooms!: RoomList;

  error: string = '';
  totalBytes = 0;

  subscription!: Subscription;

  // subject is a based class for all data streams
  error$ = new Subject<string>();
  // print error to front end
  getError$ = this.error$.asObservable()

  rooms$ = this.roomService.getRooms$.pipe(
     // to catch error in the stream
    catchError((err) => {
      this.error$.next(err.message);
      return ([]);
    })
  )

  priceFilter = new FormControl(99999);

  roomsCount$ = this.roomService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  roomList: RoomList[] = [];

  stream = new Observable(observer => {
    observer.next('user data-1');
    observer.next('user data-2');
    observer.next('user data-3');
    observer.complete()
  })

  // ViewChild - static true: component is saved to be used inside onInit of its parent
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  // depedency injection
  constructor(@SkipSelf() private roomService: RoomsService, private configSvc: ConfigService) { }

  ngAfterViewInit(): void {
    // this.headerComponent.title = 'Holiday Inn';
    //this.headerChildrenComponent.last.title = "Last title!";
  }

  ngAfterViewChecked(): void {}

  ngOnInit(): void {
    /* console.log(this.headerComponent) */
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('completed'),
      error: (err) => console.log(err)
    })
    /* this.roomService.getRooms().subscribe(rooms => {
      this.roomList = rooms
    }); */

    this.roomService.getPhotos().subscribe((event) => {
      switch(event.type) {
        case HttpEventType.Sent: {
          console.log('Request made!')
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request Success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes+= event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body)
        }
      }
    })
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRooms = room;
    console.log(this.selectedRooms);
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: "4",
      roomType: 'Deluxe Room',
      amenities: 'Air conditioned, Free Wifi, Cable TV, Kitchen',
      price: 450,
      photos: 'https://unsplash.com/photos/FV3GConVSss',
      checkInTime: new Date('9-Nov-2023'),
      checkOutTime: new Date('11-Nov-2023'),
      rating: 4.54,
    };
    //this.roomList = [...this.roomList, room];
    // this.roomList.push(room)
    this.roomService.addRooms(room).subscribe(data => {
      this.roomList = data
    })
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: "3",
      roomType: 'Deluxe Room',
      amenities: 'Air conditioned, Free Wifi, Cable TV, Kitchen',
      price: 850,
      photos: 'https://unsplash.com/photos/FV3GConVSss',
      checkInTime: new Date('9-Nov-2023'),
      checkOutTime: new Date('11-Nov-2023'),
      rating: 4.54,
    };
    this.roomService.editRoom(room).subscribe(data => {
      this.roomList = data
    })
  }

  deleteRoom() {
    this.roomService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    })
  }

  // if there are any active subscriptiopn present,
  // destroy/unsubscribe the subscription to prevent memory leak
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}

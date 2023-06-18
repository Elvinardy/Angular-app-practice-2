import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent implements OnInit {
  room: RoomList = {
    roomType: '',
    amenities: '',
    checkInTime: new Date(),
    checkOutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  };

  successMsg: string = '';

  constructor(private roomService: RoomsService) {}

  ngOnInit(): void {}

  addRoom() {
    this.roomService.addRooms(this.room).subscribe((data) => {
      this.successMsg = 'Room added successfully!';
    });
  }
}

import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  /* providers: [RoomsService] */
})
export class EmployeesComponent implements OnInit {

  empName: string = "Fred"

  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {
  }

}

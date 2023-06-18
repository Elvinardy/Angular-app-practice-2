import { AfterContentInit, Component, ContentChild, Host, OnInit, ViewChild } from '@angular/core';
import { EmployeesComponent } from '../employees/employees.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers: [RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit {

  @ContentChild(EmployeesComponent) employee!: EmployeesComponent;

  constructor() { }

  ngAfterContentInit(): void {
    this.employee.empName = "Barney"
  }

  ngOnInit(): void {
  }

}

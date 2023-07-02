import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/customValidator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  get guests() {
    return this.bookingForm.get('guests') as FormArray
  }

  constructor(private configSvc: ConfigService, private fb: FormBuilder,
    private bookingSvc: BookingService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // getting the roomid value from the endpoint to display in room ID section in the form
    const roomId = this.route.snapshot.paramMap.get('roomid');

    this.bookingForm = this.fb.group({
      roomId: new FormControl({ value: roomId, disabled: true }, {validators: [Validators.required]}), // to disable the input and give a fixed value
      guestEmail: ['', { updateOn: 'blur', validators: [Validators.required, Validators.email] }],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', { updateOn: 'blur' }],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidator.validateName, CustomValidator.validateSpecialChar('*')]],
      address: this.fb.group({
        addressLine1: ['', { validators: [Validators.required]}],
        addressLine2: [''],
        city: ['', { validators: [Validators.required]}],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false),
    });

    this.getBookingData();

    // mergeMap does not care about the sequence, it will subscribe to stream as soon as the data is provided
    // switchMap will cancel previous post request to get the latest data
    // exhaustMap will cause the previous request to be completed before making a new request
    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingSvc.bookRoom(data))
    ).subscribe((data) => {console.log(data)})
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    this.bookingForm.reset({
// to disable the input and give a fixed value
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
    this.bookingSvc.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => { console.log(data)})
  }
  // setting an initial value to the form
  getBookingData() {
    this.bookingForm.patchValue({
       // to disable the input and give a fixed value
      guestEmail: 'somebody@mail.com',
      checkinDate: new Date('10-July-2023'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    })
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }
  // reusable code for guest control
  addGuestControl() {
    return  this.fb.group({
      guestName: ['', { validators: [Validators.required]}],
      age: new FormControl('') })
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''))
  }

  deletePassport() {
    if(this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  // remove the last added guest list
  removeGuest(i: number) {
    this.guests.removeAt(i);
      // to remove the last added guest list
  }

}

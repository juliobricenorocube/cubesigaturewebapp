import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { TooltipModule, ButtonsModule, WavesModule } from 'ng-uikit-pro-standard'
import { IMyOptions } from 'ng-uikit-pro-standard';

// import { WavesModule, SelectModule } from 'ng-uikit-pro-standard';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cardForm: FormGroup;
  city: Array<any>;
  state: Array<any>;

  constructor(private fb: FormBuilder,private router: Router) {

    this.cardForm = fb.group({
      firtsname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      scode: ['', Validators.required],
      zipcode: ['', Validators.required],
      baddress: ['', Validators.required]

    });

   }

  ngOnInit() {
    this.city = [
      { value: '1', label: 'Juneau' },
      { value: '2', label: 'Wrangell' },
      { value: '3', label: 'Anchorage' },
      { value: '4', label: 'Jacksonville' },
      { value: '5', label: 'Anaconda' },
      ];

      this.state = [
        { value: '1', label: 'Alaska' },
        { value: '2', label: 'Florida' },
        { value: '3', label: 'Montana' },
        { value: '4', label: 'Oklahoma' },
        { value: '5', label: 'Texas' },
        ];

  }

  public myDatePickerOptions: IMyOptions = {
  // Your options
  }

}

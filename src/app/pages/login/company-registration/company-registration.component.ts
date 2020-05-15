import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  cardForm1: FormGroup;
  Torganizacion: Array<any>;
  nuser:Array<any>;
  constructor(private fb: FormBuilder, private router: Router, private toastrService: ToastService) {

    this.cardForm1 = fb.group({
      firtsname: ['', Validators.required],
      lastname: ['', Validators.required],
      organame: ['', Validators.required],
      pnum: ['', Validators.required]
    });

   }
  // Torganizacion: Array<any>;
  ngOnInit() {
    this.Torganizacion = [
      { value: '1', label: 'BAS Contractor' },
      { value: '2', label: 'Electrical Contrator' },
      { value: '3', label: 'General Contrator' },
      { value: '4', label: 'Manufacturer' },
      { value: '5', label: 'Manufacturer Representative' },
      { value: '6', label: 'Mechanical Contrator' },
      { value: '7', label: 'Other' }
      ];

      this.nuser = [
        { value: '1', label: '5' },
        { value: '2', label: '6' },
        { value: '3', label: '7' },
        { value: '4', label: '8' },
        { value: '5', label: '9' },
        { value: '6', label: '10' },
        { value: '7', label: '11' },
        { value: '8', label: '12' },
        { value: '9', label: '50' }
        ];
  }

}

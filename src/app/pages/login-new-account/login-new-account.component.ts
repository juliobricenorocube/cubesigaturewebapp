import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-login-new-account',
  templateUrl: './login-new-account.component.html',
  styleUrls: ['./login-new-account.component.scss']
})
export class LoginNewAccountComponent implements OnInit {
  cardForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastrService: ToastService) {
    this.cardForm = fb.group({
      materialFormCardNameEx: ['', Validators.required],
      materialFormCardEmailEx: ['', [Validators.email, Validators.required]],
      materialFormCardConfirmEx: ['', Validators.required],
      materialFormCardPasswordEx: ['', Validators.required]
    });
  }

  showSuccess() {
    const options = { toastClass: 'opacity: 1 ' };
    this.toastrService.success('Account Successfully Created', 'Your account has been created. Please click you can verify information has been emailed to example@gmail.com and follow instructions to verify your account.', options);
    // this.toastrService.success('Account Successfully Created.Your account has been created. Please click you can verify information has been emailed to example@gmail.com and follow instructions  to verify your account.');
  }
  removeAlerts() {
  this.toastrService.clear();
}
  ngOnInit() {

  }

}

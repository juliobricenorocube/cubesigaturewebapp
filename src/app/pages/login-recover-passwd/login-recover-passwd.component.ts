import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login-recover-passwd',
  templateUrl: './login-recover-passwd.component.html',
  styleUrls: ['./login-recover-passwd.component.scss']
})
export class LoginRecoverPasswdComponent implements OnInit {
  cardForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.cardForm = fb.group({
      materialFormCardNameEx: ['', Validators.required],
      materialFormCardEmailEx: ['', [Validators.email, Validators.required]],
      materialFormCardConfirmEx: ['', Validators.required],
      materialFormCardPasswordEx: ['', Validators.required]
    });
  }
  ngOnInit() {
  }

}

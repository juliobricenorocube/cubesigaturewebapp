import { Component, OnInit, ViewChild } from '@angular/core';
// forms
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// route page
import { Routes, RouterModule, Router } from '@angular/router';
import { IMyOptions } from 'ng-uikit-pro-standard';
import {HttpClient} from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { ApiResponse } from 'src/app/models/api-response';

import { DataService } from '../../shared/data-service/data.service.service';

import { AppConfigService } from '../../app-config.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('uploader', {static: true})
  uploader: any;
  optionCompanysSelect: Array<any>;
  cardForm: FormGroup;
  submitted = false;
  isLoading = false;
  msgError: string;
  showError = false;
  file: File | null;
  apiBaseUrl: string;
  showPassword = false;
  typeInputPassword = 'password';

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient,
              private userService: UserService, private data: DataService, private appConfigService: AppConfigService) {



  // validations
  // this.cardForm = fb.group({
  //   materialFormCardNameEx: ['', Validators.required],
  //   materialFormCardEmailEx: ['', [Validators.email, Validators.required]],
  //   materialFormCardConfirmEx: ['', Validators.required],
  //   materialFormCardPasswordEx: ['', Validators.required]
  // });
  }

  // onFileAdd(file: any) {
  //   this.file = file;
  // }
  //
  // onFileRemove() {
  //   this.file = null;
  // }
  //
  // uploadFile() {
  //   if (this.file) {
  //     const data = new FormData();
  //     data.append('file', this.file, this.file.name);
  //     const url = 'http://localhost:3000/api/upload/';
  //
  //     this.http.post(url, data, { responseType: 'text' }).subscribe( val => console.log(val));
  //   }
  // }
  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.apiBaseUrl = this.appConfigService.apiBaseUrl;

    console.log(this.apiBaseUrl);

    this.optionCompanysSelect = [
      { value: '1', label: 'Amazing Control' },
      { value: '2', label: 'CUBE-USA' },
      { value: '3', label: 'South Florida Control' },
      { value: '4', label: 'Template Company' },
      { value: '5', label: 'Travis Brothers' },
      ];

    localStorage.clear();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.typeInputPassword = this.showPassword ? 'text' : 'password';
  }
  onSubmit() {
    this.showError = false;
    this.msgError = '';
    this.submitted = true;
    // stop here if form is invalid
    if (this.cardForm.invalid) {
        return;
    }
    this.isLoading = true;
    this.userService.login(this.cardForm.value).subscribe((data: ApiResponse) => {
      if (data.connected) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.userName);

         this.data.changeUser(data.userName);

         this.router.navigate(['/serviceWorkOrder']);
      } else {
          this.showError = true;
          this.msgError = 'Invalid User name or password';
      }
    }, error => {
      this.showError = true;
      this.msgError = 'Server internal error, please contact the administrator!';
    });
    this.submitted = false;
    this.isLoading = false;
  }
  gotoEstimate() {
    console.log(this.cardForm);
  }
  public myDatePickerOptions: IMyOptions = {
  // Your options
  }

}

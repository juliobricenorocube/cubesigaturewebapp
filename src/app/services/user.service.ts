import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginUser } from '../models/login-user';
import { ApiResponse } from '../models/api-response';
import { UserMenuNodes } from '../models/user-menu-nodes';

import { AppConfigService } from '../app-config.service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uri = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.uri = this.appConfigService.apiBaseUrl;
  }

  login(loginUser: LoginUser) {
    this.uri = this.appConfigService.apiBaseUrl;
    return this.http.post<ApiResponse>(this.uri + '/user', loginUser);
  }
  getMenu() {
    this.uri = this.appConfigService.apiBaseUrl;
    return this.http.post<UserMenuNodes[]>(this.uri + '/UserMenu', {});
  }

  validationCode(code) {
    return this.http.post<any>(this.appConfigService.apiBaseUrl + '/Service/ValidateServiceSignature', {
      ValidationCode: code
    });
  }

  SaveServiceSignature(model: any) {
    model.EndDate = model.EndDate.replace('-', '').replace('-', '');
    return this.http.post<any>(this.appConfigService.apiBaseUrl + '/Service/SaveServiceSignature', model);
  }

}

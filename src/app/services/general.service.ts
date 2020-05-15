import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private uri = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService,
    private toastService: ToastService) {
    this.uri = this.appConfigService.apiBaseUrl;
   }

   SaveUserSettings(model) {
    return this.http.post(this.uri + '/User/SaveUserSettings', model);
   }

   getInitials(item) {
    let strs = item.split(' ');
    let initials = '';
    if (strs.length > 1) {
      initials = `${strs[0].substr(0, 1)}${strs[1].substr(0, 1)}`;
    } else {
      initials = `${strs[0].substr(0, 1)}`;
    }

    return initials;
  }
}

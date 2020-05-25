import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-service-work-order',
  templateUrl: './service-work-order.component.html',
  styleUrls: ['./service-work-order.component.scss']
})
export class ServiceWorkOrderComponent implements OnInit {

  code = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private toast: ToastService) { }

  ngOnInit() {
  }

  validateCode() {
    this.userService.validationCode(this.code).subscribe(res => {
      if (res.identity > 0) {
        this.router.navigateByUrl('/SWOsignature/' + this.code + '/' + res.identity);
      } else {
        this.toast.error('Service Work Order not found');
      }
    }, err => this.toast.error('Error has ocurred in server'));
  }

}

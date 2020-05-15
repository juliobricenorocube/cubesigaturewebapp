import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'ng-uikit-pro-standard';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toast: ToastService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // this.authenticationService.logout();
                // location.reload(true);
            } else {
              // this.toast.error('An unknown error has occurred: ' + err.status);
            }
            // const error = err.error.message || err.statusText;
            return throwError(err);
        }));

    }
}

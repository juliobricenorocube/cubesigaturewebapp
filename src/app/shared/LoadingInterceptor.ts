import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loaderService: LoadingService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loaderService.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;

        if (this.totalRequests === 0) {
          this.loaderService.isLoading.next(false);

        }
      })
    );
  }
}

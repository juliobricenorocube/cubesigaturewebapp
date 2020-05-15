import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-uikit-pro-standard';
  isNavCollapse = false;
  visibleNav: boolean;
  constructor(public loadingService: LoadingService) {}
}

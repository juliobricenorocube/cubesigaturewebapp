import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { MdbFileUploadModule } from "mdb-file-upload";
import { MdbSortableModule } from 'mdb-sortable';
import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// pages references
import { APP_ROUTING } from './app.routes';
// Menu
import { NavbarSidebarComponent } from './shared/navbar-sidebar/navbar-sidebar.component';
// login Module
import { LoginNewAccountComponent } from './pages/login-new-account/login-new-account.component';
import { LoginRecoverPasswdComponent } from './pages/login-recover-passwd/login-recover-passwd.component';
import bootstrap from "bootstrap";
import { KeysPipe } from './custom-pipe/KeysPipe';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// import { EditProjectComponent } from './pages/sales-management/sales-project/edit-project/edit-project.component';
import { MdbWysiwygModule } from "mdb-wysiwyg";
import { CustomDataTableComponent } from './shared/custom-data-table/custom-data-table.component';
import { SearchPipe } from './custom-pipe/SearchPipe';
import { DashboardDraggableOptionsComponent } from './shared/dashboard-draggable-options/dashboard-draggable-options.component';

import { AppConfigService } from './app-config.service.service';
import { GetTypePipe } from './custom-pipe/GetTypePipe';
// devexpress
// tslint:disable-next-line: max-line-length
import { DxSchedulerModule, DxSchedulerComponent, DxTemplateModule, DxGanttModule, DxDiagramModule, DxDiagramComponent, DxContextMenuModule, DxButtonModule, DxPopupModule, DxTextBoxModule, DxDateBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxRangeSliderModule, DxFormModule } from "devextreme-angular";
// import { Service, MovieData, TheatreData, Data } from './services/app.service';

import { LoadingInterceptor } from './shared/LoadingInterceptor';
import { FileSaverModule } from 'ngx-filesaver';
import { ErrorInterceptor } from './shared/ErrorInterceptor';
import { ServiceWorkOrderComponent } from './pages/service-work-order/service-work-order.component';
import { ServiceWorkOrderSignatureComponent } from './pages/service-work-order-signature/service-work-order-signature.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DataService } from './shared/data-service/data.service.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './pages/login/login.component';
import { CompanyRegistrationComponent } from './pages/login/company-registration/company-registration.component';
import { PaymentComponent } from './pages/login/payment/payment.component';
import { SignaturePadModule } from 'angular2-signaturepad';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarSidebarComponent,
    LoginComponent,
    CompanyRegistrationComponent,
    PaymentComponent,
    LoginNewAccountComponent,
    LoginRecoverPasswdComponent,
    // PIPES
    KeysPipe,
    SearchPipe,
    GetTypePipe,
    DashboardDraggableOptionsComponent,
    ServiceWorkOrderComponent,
    ServiceWorkOrderSignatureComponent,


  ],
  imports: [
    // NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFileUploadModule,
    MdbSortableModule,
    HttpModule,
    HttpClientModule,
    FileSaverModule,
    MdbWysiwygModule,
    AngularFontAwesomeModule,
    APP_ROUTING,
    // scheduler
    DxSchedulerModule,
    DxContextMenuModule,
    DxTemplateModule,
    DxPopupModule,
    DxButtonModule,
    DxTemplateModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxRangeSliderModule,
    DxNumberBoxModule,
    DxFormModule,
    // gantt
    DxGanttModule,
    // Diagram
    DxDiagramModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    SignaturePadModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: 'Your_api_key'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    MDBSpinningPreloader,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    UserService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

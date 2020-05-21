import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginNewAccountComponent } from './pages/login-new-account/login-new-account.component';
import { LoginRecoverPasswdComponent } from './pages/login-recover-passwd/login-recover-passwd.component';
// import { DashboardCreateComponent } from './pages/dashboard/dashboard-create/dashboard-create.component'
// import { DashboardWidgetComponent } from './pages/dashboard/dashboard-widget/dashboard-widget.component'
import { ServiceWorkOrderComponent } from './pages/service-work-order/service-work-order.component';
import { ServiceWorkOrderSignatureComponent } from './pages/service-work-order-signature/service-work-order-signature.component';

const APP_ROUTES: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // { path: 'NewAccount', component: LoginNewAccountComponent },
  // { path: 'RecoverPassword', component: LoginRecoverPasswdComponent },
  { path: '', redirectTo: 'serviceWorkOrder', pathMatch: 'full' },
  { path: 'serviceWorkOrder', component: ServiceWorkOrderComponent },
  { path: 'SWOsignature/:code', component: ServiceWorkOrderSignatureComponent }
  // { path: 'editProject', component: EditProjectComponent },



  // { path: 'dashboardCreate', component: DashboardCreateComponent },
  // { path: 'dashboardWidget', component: DashboardWidgetComponent }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

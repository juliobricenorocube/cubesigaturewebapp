import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRecoverPasswdComponent } from './login-recover-passwd.component';

describe('LoginRecoverPasswdComponent', () => {
  let component: LoginRecoverPasswdComponent;
  let fixture: ComponentFixture<LoginRecoverPasswdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRecoverPasswdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRecoverPasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

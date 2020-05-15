import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNewAccountComponent } from './login-new-account.component';

describe('LoginNewAccountComponent', () => {
  let component: LoginNewAccountComponent;
  let fixture: ComponentFixture<LoginNewAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginNewAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

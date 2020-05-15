import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceWorkOrderSignatureComponent } from './service-work-order-signature.component';

describe('ServiceWorkOrderSignatureComponent', () => {
  let component: ServiceWorkOrderSignatureComponent;
  let fixture: ComponentFixture<ServiceWorkOrderSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceWorkOrderSignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceWorkOrderSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

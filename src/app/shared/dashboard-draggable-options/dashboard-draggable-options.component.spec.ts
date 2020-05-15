import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDraggableOptionsComponent } from './dashboard-draggable-options.component';

describe('DashboardDraggableOptionsComponent', () => {
  let component: DashboardDraggableOptionsComponent;
  let fixture: ComponentFixture<DashboardDraggableOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDraggableOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDraggableOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

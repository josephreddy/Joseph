import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegularCreateComponent } from './admin-regular-reg-list.component';

describe('AdminDemoRegListComponent', () => {
  let component: AdminRegularCreateComponent;
  let fixture: ComponentFixture<AdminRegularCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegularCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegularCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

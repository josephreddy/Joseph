import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDemoRegListComponent } from './admin-demo-reg-list.component';

describe('AdminDemoRegListComponent', () => {
  let component: AdminDemoRegListComponent;
  let fixture: ComponentFixture<AdminDemoRegListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDemoRegListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDemoRegListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

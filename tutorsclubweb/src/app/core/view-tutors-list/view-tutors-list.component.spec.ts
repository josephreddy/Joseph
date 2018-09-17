import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTutorsListComponent } from './view-tutors-list.component';

describe('ViewTutorsListComponent', () => {
  let component: ViewTutorsListComponent;
  let fixture: ComponentFixture<ViewTutorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTutorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTutorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

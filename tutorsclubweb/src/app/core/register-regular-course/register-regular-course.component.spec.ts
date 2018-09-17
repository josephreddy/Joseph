import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRegularCourseComponent } from './register-regular-course.component';

describe('RegisterDemoCourseComponent', () => {
  let component: RegisterRegularCourseComponent;
  let fixture: ComponentFixture<RegisterRegularCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRegularCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRegularCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

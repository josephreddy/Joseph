import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDemoCourseComponent } from './register-demo-course.component';

describe('RegisterDemoCourseComponent', () => {
  let component: RegisterDemoCourseComponent;
  let fixture: ComponentFixture<RegisterDemoCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDemoCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDemoCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseExplanationComponent } from './course-explanation.component';

describe('CourseExplanationComponent', () => {
  let component: CourseExplanationComponent;
  let fixture: ComponentFixture<CourseExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

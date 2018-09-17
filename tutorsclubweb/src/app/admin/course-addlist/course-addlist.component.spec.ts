import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddlistComponent } from './course-addlist.component';

describe('CourseAddlistComponent', () => {
  let component: CourseAddlistComponent;
  let fixture: ComponentFixture<CourseAddlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAddlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

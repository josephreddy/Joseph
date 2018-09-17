import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLearnerProfileComponent } from './edit-learner-profile.component';

describe('EditLearnerProfileComponent', () => {
  let component: EditLearnerProfileComponent;
  let fixture: ComponentFixture<EditLearnerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLearnerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLearnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerDemoRegComponent } from './learner-demo-reg.component';

describe('LearnerDemoRegComponent', () => {
  let component: LearnerDemoRegComponent;
  let fixture: ComponentFixture<LearnerDemoRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerDemoRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerDemoRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

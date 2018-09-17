import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDemoRegComponent } from './tutor-demo-reg.component';

describe('TutorDemoRegComponent', () => {
  let component: TutorDemoRegComponent;
  let fixture: ComponentFixture<TutorDemoRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorDemoRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDemoRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

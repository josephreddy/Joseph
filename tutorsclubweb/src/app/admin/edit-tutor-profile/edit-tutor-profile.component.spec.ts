import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTutorProfileComponent } from './edit-tutor-profile.component';

describe('EditTutorProfileComponent', () => {
  let component: EditTutorProfileComponent;
  let fixture: ComponentFixture<EditTutorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTutorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTutorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToSignupParentComponent } from './go-to-signup-parent.component';

describe('GoToSignupParentComponent', () => {
  let component: GoToSignupParentComponent;
  let fixture: ComponentFixture<GoToSignupParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoToSignupParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoToSignupParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

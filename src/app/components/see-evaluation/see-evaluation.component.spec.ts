import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeEvaluationComponent } from './see-evaluation.component';

describe('SeeEvaluationComponent', () => {
  let component: SeeEvaluationComponent;
  let fixture: ComponentFixture<SeeEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

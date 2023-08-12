import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersCardsComponent } from './teachers-cards.component';

describe('TeachersCardsComponent', () => {
  let component: TeachersCardsComponent;
  let fixture: ComponentFixture<TeachersCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

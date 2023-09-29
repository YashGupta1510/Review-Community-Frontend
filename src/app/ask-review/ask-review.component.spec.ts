import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskReviewComponent } from './ask-review.component';

describe('AskReviewComponent', () => {
  let component: AskReviewComponent;
  let fixture: ComponentFixture<AskReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskReviewComponent]
    });
    fixture = TestBed.createComponent(AskReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

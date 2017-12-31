import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerAnimation } from './loading-animation.component';

describe('LoadingSpinnerAnimation', () => {
  let component: LoadingSpinnerAnimation;
  let fixture: ComponentFixture<LoadingSpinnerAnimation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerAnimation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerAnimation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

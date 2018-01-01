import { async, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerAnimation } from '../../core/custom-elements/loading-animation.component';
import { APIService } from '../../core/api.service';
import { ItemDetailsComponent } from './item-details.component';

describe('ItemDetailsComponent', () => {
  let router: Router;
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientModule ],
      declarations: [ ItemDetailsComponent, LoadingSpinnerAnimation ],
      providers: [ APIService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should have onLinkClick function', () => {
    expect(component.onLinkClick).toBeTruthy();
  });

  it('should show loading icon on link click', () => {
    component.showLoading = false;
    component.onLinkClick();
    expect(component.showLoading).toBe(true);
  });

  it('should navigate to the home page', () => {
    router.navigate(['../../../'])
    .then(() => {
      expect(router.url).toBe('/');
    });
  });
});

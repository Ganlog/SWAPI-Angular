import { Component, OnInit } from '@angular/core';
import { APIService } from '../core/api.service';

@Component({
  selector: 'app-home',
  template: `
  <div class='categories'>
    <div class='category' *ngFor='let category of categories' [routerLink]="['/list', category]">
      <img class='category-img' [src]="'/assets/images/'+category+'.png'">
      <p class='category-name'>{{category}}</p>
    </div>
  </div>
  <loading-animation *ngIf="showLoading"></loading-animation>
  `,
  styles: [`
    .categories{
      margin: auto;
      text-align: center;
    }
    .category{
      background: #2D2D2D;
      border-radius: 10px;
      width: 200px;
      height: 250px;
      display: inline-block;
      position: relative;
      margin: 10px;
      cursor: pointer;
    }
    .category-img{
      max-width: 200px;
      max-height: 200px;
    }
    .category-name{
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
    }
    @media only screen and (max-width: 500px) {
      .category{
          width: 150px;
          height: 175px;
      }
      .category-img{
        max-width: 150px;
        max-height: 150px;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  public categories: Object;
  public showLoading: boolean = true;

  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.apiService.getCategories().subscribe(data => {
      this.categories = data;
      this.showLoading = false;
    });
  }
}

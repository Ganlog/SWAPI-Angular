import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../core/api.service';

@Component({
  selector: 'app-list',
  template: `
    <button mat-button [routerLink]="['../../']">🡨 Home</button>
    <div class='items'>
      <div class='item' *ngFor='let item of items' [routerLink]="['./', item.id]">
        <div class='item-name'>{{item.name}}</div>
      </div>
    </div>
    <button mat-button *ngIf="moreToLoad" class='center' (click)="loadMore()">Load More</button>
    <loading-animation *ngIf="showLoading"></loading-animation>
  `,
  styles: [`
    .items{
      margin: auto;
      text-align: center;
    }
    .item{
      background: #2D2D2D;
      border-radius: 10px;
      width: 250px;
      height: 100px;
      display: inline-block;
      position: relative;
      margin: 10px;
      cursor: pointer;
    }
    .item-name{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .center{
      margin: auto;
      display: block;
    }
  `]
})
export class ListComponent implements OnInit {
  public showLoading: boolean = true;
  public moreToLoad: boolean = false;
  public items: Object;
  public nextURL: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: APIService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apiService.getListOfNamesFromCategory(params.category).subscribe(data => {
         this.items = data.list;
         this.showLoading = false;
         this.moreToLoad = data.nextExists;
      });
    });
  }

  loadMore(){
    this.moreToLoad = false;
    this.showLoading = true;
    this.route.params.subscribe(params => {
      this.apiService.loadMoreNames().subscribe(data => {
         Array.prototype.push.apply(this.items, data.list);
         this.showLoading = false;
         this.moreToLoad = data.nextExists;
      });
    });
  }

}

import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../core/api.service';

@Component({
  selector: 'app-list',
  template: `
    <button mat-button [routerLink]="['../../']">🡨 Home</button>
    <div class='items'>
      <div class='item' *ngFor='let item of items' [routerLink]="['./', item.id]">
        <p class='item-name'>{{item.name}}</p>
      </div>
    </div>
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
         if (this.isBottomReached())
           this.loadMore();
      });
    });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.isBottomReached())
      this.loadMore();
  }

  loadMore(){
    if(this.moreToLoad){
      this.moreToLoad = false;
      this.showLoading = true;
      this.route.params.subscribe(params => {
        this.apiService.loadMoreNames().subscribe(data => {
           Array.prototype.push.apply(this.items, data.list);
           this.showLoading = false;
           this.moreToLoad = data.nextExists;
           if (this.isBottomReached())
             this.loadMore();
        });
      });
    }
  }

  isBottomReached(){
    let status = "not reached";
    let windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    let docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    let windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log("tru");
      return true;
    }
  }

}

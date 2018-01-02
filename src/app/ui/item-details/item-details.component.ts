import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../core/api.service';

@Component({
  selector: 'app-item-details',
  template: `
    <button mat-button [routerLink]="['../../../']">🡨 Home</button>
    <button mat-button [routerLink]="['../']">🡨 List</button>
    <div class='container'>
      <div class='info' *ngIf="!showLoading">
        <h3 class='name'>{{name}}</h3>
        <div>
          <div *ngFor='let key of objectKeys(informations)'>
            <div *ngIf="(key == 'Homeworld'); else else_content">
              <p><span class='bold'>{{key}}: </span><a [routerLink]="['../../'+informations[key]]" (click)="onLinkClick()">link</a></p>
            </div>
            <ng-template #else_content>
              <p><span class='bold'>{{key}}: </span><span>{{informations[key]}}</span></p>
            </ng-template>
          </div>
        </div>
      </div>
      <div class='links' *ngIf="!showLoading">
        <div class='links-category' *ngFor='let key of objectKeys(linksInCategories)'>
          <p class='name'>{{key}}</p>
          <span *ngFor='let link of linksInCategories[key]; let i=index'>
            <a [routerLink]="['../../'+link]" (click)="onLinkClick()">Link{{i+1}}</a><span>, </span>
          </span>
        </div>
      </div>
    </div>
    <loading-animation *ngIf="showLoading"></loading-animation>
  `,
  styles: [`
    .container{
      margin: auto;
      text-align: center;
    }
    .info, .links{
      display: inline-block;
      width: 500px;
      height: 100%;
      vertical-align: top;
      margin-top: 10px;
    }
    .info{
      background: #2D2D2D;
      border-radius: 10px;
      padding-bottom: 10px;
    }
    .info p{
      padding: 5px;
      text-align: left;
      display: block;
    }
    .name{
      padding: 10px 0;
    }
    .bold{
      font-weight: bold;
    }
    .links-category{
      background: #2D2D2D;
      border-radius: 10px;
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
  `]
})
export class ItemDetailsComponent implements OnInit {
  public objectKeys = Object.keys;
  public showLoading: boolean = true;
  public name: string;
  public informations: Object;
  public linksInCategories: Object;

  constructor(
    private route: ActivatedRoute,
    private apiService: APIService,
  ) { };

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apiService.getDetailedInfo(params.category, params.id).subscribe(data => {
        this.name = data.name;
        this.informations = data.info;
        this.linksInCategories = data.linksInCategories;
        this.showLoading = false;
      });
    });
  }

  onLinkClick() {
    this.showLoading = true;
  }

}

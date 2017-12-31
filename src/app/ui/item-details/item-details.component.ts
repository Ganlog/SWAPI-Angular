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
        <div *ngFor='let key of objectKeys(informations)'>
          <p class='item-info'><span class='bold'>{{key}}</span>: {{informations[key]}}</p>
        </div>
      </div>
      <div class='links' *ngIf="!showLoading">
        <div class='links-category' *ngFor='let key of objectKeys(linksInCategories)'>
          <p class='name'>{{key}}</p>
          <div class='links-list' *ngFor='let link of linksInCategories[key]'>
            <a href="{{link}}" class='link'>{{link}}</a>
          </div>
        </div>
      </div>
    </div>
    <loading-animation *ngIf="showLoading"></loading-animation>
  `,
  styles: [`
    .container{
      margin: auto;
      text-align: center;
      display:relative;
    }
    .info, .links{
      display: inline-table;
      width: 400px;
    }
    .info{
      background: #2D2D2D;
      border-radius: 10px;
      position: relative;
      padding: 10px;
      cursor: pointer;
    }
    .name{
      margin: 5px;
      text-align: center;
      font-weight: bold;
    }
    .bold{
      font-weight: bold;
    }
    .links{
      position: relative;
      top:0;
    }
    .links-category{
      background: #2D2D2D;
      border-radius: 10px;
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
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apiService.getDetailedInfo(params.category, params.id).subscribe(data => {
        console.log(data);
        this.name = data.name;
        this.informations = data.info;
        this.linksInCategories = data.linksInCategories;
        this.showLoading = false;
      });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../core/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-details',
  template: `
    <button mat-button [routerLink]="['../../../']">🡨 Home</button>
    <button mat-button [routerLink]="['../']">🡨 List</button>
  `,
  styles: [`

  `]
})
export class ItemDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private apiService: APIService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apiService.getDetailedInfo(params.category, params.id).subscribe(data => {

      });
    });
  }

}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerAnimation } from './custom-elements/loading-animation.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
  ],
  exports: [
    LoadingSpinnerAnimation,
    MatButtonModule,
  ],
  declarations: [
    LoadingSpinnerAnimation,
  ],
  providers: [
    APIService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class CoreModule { }

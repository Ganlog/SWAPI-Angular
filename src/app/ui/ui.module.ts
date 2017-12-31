import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiRoutingModule } from './ui-routing.module';
import { ListComponent } from './list/list.component';
import { CoreModule } from '../core/core.module';
import { ItemDetailsComponent } from './item-details/item-details.component';

@NgModule({
  imports: [
    CommonModule,
    UiRoutingModule,
    CoreModule,
  ],
  declarations: [
    ListComponent,
    ItemDetailsComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class UiModule { }

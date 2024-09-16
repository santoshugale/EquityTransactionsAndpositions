import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionsRoutingModule } from './positions-routing.module';
import { PositionsComponent } from './positions.component';
import { PositionsService } from './positions.service';


@NgModule({
  declarations: [
    PositionsComponent
  ],
  imports: [
    CommonModule,
    PositionsRoutingModule
  ],
  providers: [PositionsService]
})
export class PositionsModule { }

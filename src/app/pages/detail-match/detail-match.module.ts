import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesPicksComponent } from './series-picks/series-picks.component';
import { DetailContentComponent } from './detail-content/detail-content.component';



@NgModule({
  declarations: [
    SeriesPicksComponent,
    DetailContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SeriesPicksComponent,
    DetailContentComponent
  ]
})
export class DetailMatchModule { }

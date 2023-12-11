import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveRecentsComponent } from './live-recents/live-recents.component';
import { UpcomingMatchesComponent } from './upcoming-matches/upcoming-matches.component';
import { NewsComponent } from './news/news.component';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    NewsComponent,
    LiveRecentsComponent,
    UpcomingMatchesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    NewsComponent,
    LiveRecentsComponent,
    UpcomingMatchesComponent
  ]
})
export class HomeModule { }

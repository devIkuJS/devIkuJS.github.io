import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveRecentsComponent } from './live-recents/live-recents.component';
import { UpcomingMatchesComponent } from './upcoming-matches/upcoming-matches.component';
import { NewsComponent } from './news/news.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NewsComponent,
    LiveRecentsComponent,
    UpcomingMatchesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NewsComponent,
    LiveRecentsComponent,
    UpcomingMatchesComponent
  ]
})
export class HomeModule { }

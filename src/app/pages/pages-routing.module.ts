import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailMatchComponent } from './detail-match/detail-match.component';
import { DetailPartidaLiveComponent } from './detail-partida-live/detail-partida-live.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'detalle-partida/:matchid/:matchindex/series-id/:seriesid/teams/:teamidhome/:teamidaway', component: DetailMatchComponent },
  {path: 'partida-en-vivo/:seriesid/teams/:teamidhome/:teamidaway', component: DetailPartidaLiveComponent }
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

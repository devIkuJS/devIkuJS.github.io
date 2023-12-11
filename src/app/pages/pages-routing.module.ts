import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailMatchComponent } from './detail-match/detail-match.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'detalle-partida/:matchid/series-id/:seriesid/teams/:teamidhome/:teamidaway', component: DetailMatchComponent }
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

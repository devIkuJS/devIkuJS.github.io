import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from './home/home.module';
import { DetailMatchComponent } from './detail-match/detail-match.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DetailPartidaLiveComponent } from './detail-partida-live/detail-partida-live.component';
import { SafePipe } from '../services/pipes/safe-pipe.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    DetailMatchComponent,
    DetailPartidaLiveComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    CanvasJSAngularChartsModule
  ],
  exports: [
    HomeComponent,
    DetailMatchComponent,
    DetailPartidaLiveComponent
  ]
})
export class PagesModule { }

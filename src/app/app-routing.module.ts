import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NopageFoundComponent},
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

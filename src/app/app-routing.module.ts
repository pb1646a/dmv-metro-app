import { MetroBusComponent } from './metro/metro-bus/metro-bus/metro-bus.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './metro/dashboard/dashboard.component';


const routes: Routes = [{
  path:'', redirectTo:'/metro', pathMatch:'full'},
{path:'**', redirectTo:'/metro', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

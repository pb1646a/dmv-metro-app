import { MetroBusComponent } from './metro-bus/metro-bus/metro-bus.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path:'metro', children:[
    {path:'', component:DashboardComponent},
    {path:'metrobus', component:MetroBusComponent}
  ]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetroRoutingModule { }

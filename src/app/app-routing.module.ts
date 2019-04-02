import { MetroBusComponent } from './metro/metro-bus/metro-bus/metro-bus.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './metro/dashboard/dashboard.component';


const routes: Routes = [{
  path:'', redirectTo:'/metro', pathMatch:'full'},
{path:'metro', component:DashboardComponent }
{path:'metro/metrobus', component: MetroBusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

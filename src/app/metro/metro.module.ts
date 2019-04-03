import { MetroRoutingModule } from './metro-routing.module';

import { MetroBusComponent } from "./metro-bus/metro-bus/metro-bus.component"
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component';
import {CommonComponentsModule} from '../common-components/common-components.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { StopTableComponent } from './metro-bus/stop-table/stop-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapViewComponent } from './map-view/map-view.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CommonComponentsModule,MetroRoutingModule],
  declarations: [MetroBusComponent, SearchResultsComponent, FavoritesComponent, StopTableComponent, DashboardComponent, MapViewComponent],
  exports: [MetroBusComponent, DashboardComponent]
})
export class MetroModule {}

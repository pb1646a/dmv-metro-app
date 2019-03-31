import { MetroBusComponent } from "./metro-bus/metro-bus.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component';
import {CommonComponentsModule} from '../common-components/common-components.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { StopTableComponent } from './stop-table/stop-table.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CommonComponentsModule],
  declarations: [MetroBusComponent, SearchResultsComponent, FavoritesComponent, StopTableComponent],
  exports: [MetroBusComponent]
})
export class MetroBusModule {}

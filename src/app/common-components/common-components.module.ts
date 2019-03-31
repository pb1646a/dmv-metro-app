import { NgModule } from "@angular/core";
import { HomeComponent } from './home/home.component';
import { TopNavComponent } from './navigation/top-nav/top-nav.component';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatTableModule, MatExpansionModule, MatTreeModule, MatProgressSpinnerModule, MatPaginatorModule, MatIconModule} from '@angular/material';


@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [MatInputModule, MatTableModule,MatExpansionModule, MatTreeModule, MatProgressSpinnerModule, MatPaginatorModule, MatIconModule],
  declarations: [HomeComponent, TopNavComponent],
  providers: []
})
export class CommonComponentsModule {}

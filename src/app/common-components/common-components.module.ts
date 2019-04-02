import { NgModule } from "@angular/core";
import { HomeComponent } from './home/home.component';
import { TopNavComponent } from './navigation/top-nav/top-nav.component';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatTableModule,
  MatExpansionModule, MatTreeModule, MatProgressSpinnerModule, MatPaginatorModule, MatIconModule, MatTabsModule, MatButtonModule, MatToolbarModule} from '@angular/material';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, RouterModule, MatToolbarModule, MatButtonModule],
  exports: [TopNavComponent,MatInputModule,
    MatTableModule,MatExpansionModule, MatTreeModule,
    MatProgressSpinnerModule, MatPaginatorModule, MatIconModule, MatTabsModule, MatButtonModule, MatToolbarModule],
  declarations: [HomeComponent, TopNavComponent],
  providers: []
})
export class CommonComponentsModule {}

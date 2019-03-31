import { CommonComponentsModule } from './common-components/common-components.module';
import { MetroAuthInterceptor } from './common-components/services/metro-auth.interceptor';
import { MetroBusModule } from './metro-bus/metrobus.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MetroBusModule,
    CommonComponentsModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: MetroAuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

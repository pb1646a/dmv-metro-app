
import { CommonComponentsModule } from './common-components/common-components.module';
import { MetroAuthInterceptor } from './common-components/services/metro-auth.interceptor';
import {  MetroModule } from './metro/metro.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';


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
    MetroModule,
    CommonComponentsModule,

  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: MetroAuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './private/home/home.component';
import { FavouriteComponent } from './private/favourite/favourite.component';
import { LoaderComponent } from './utils/loader/loader.component';
import { AlertComponent } from './utils/alert/alert.component';
import { HttpinterceptorService } from './services/httpinterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FavouriteComponent,
    LoaderComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

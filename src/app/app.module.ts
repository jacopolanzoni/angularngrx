import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './home/menu.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { ProductData } from './products/product-data';
import { ShellComponent } from './home/shell.component';
import { UserModule } from './user/user.module';
import { WelcomeComponent } from './home/welcome.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    HttpClientModule,
    StoreModule.forRoot({}),
    UserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

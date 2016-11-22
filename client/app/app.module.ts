import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import {routing, appRoutingProviders }          from './app.routing';

import {ClientModule} from './components/client/client.module';
import {AdminModule} from './admin/admin.module';

@NgModule({
  imports:      [ 
    BrowserModule, 
    ClientModule, 
    AdminModule,
    routing],

  declarations: [ AppComponent],

  providers: [
    appRoutingProviders
  ],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }
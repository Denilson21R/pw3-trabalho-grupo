import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import {HttpClientModule} from "@angular/common/http";
import { TempoPreparoPipe } from './pipes/tempo-preparo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabsComponent,
    IngredientesComponent,
    TempoPreparoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

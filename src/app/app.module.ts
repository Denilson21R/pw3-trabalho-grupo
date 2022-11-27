import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import {HttpClientModule} from "@angular/common/http";
import { TempoPreparoPipe } from './pipes/tempo-preparo.pipe';
import { SalvarIngredienteComponent } from './components/salvar-ingrediente/salvar-ingrediente.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabsComponent,
    IngredientesComponent,
    TempoPreparoPipe,
    SalvarIngredienteComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {IngredientesComponent} from "./components/ingredientes/ingredientes.component";
import {SalvarIngredienteComponent} from "./components/salvar-ingrediente/salvar-ingrediente.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ingredientes', component: IngredientesComponent },
  { path: 'ingredientes/atualizar/:id', component: SalvarIngredienteComponent },
  { path: 'ingredientes/novo', component: SalvarIngredienteComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

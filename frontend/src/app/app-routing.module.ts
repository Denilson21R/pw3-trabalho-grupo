import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastraReceitaComponent } from './components/cadastra-receita/cadastra-receita.component';
import {HomeComponent} from "./components/home/home.component";
import {IngredientesComponent} from "./components/ingredientes/ingredientes.component";
import {SalvarIngredienteComponent} from "./components/salvar-ingrediente/salvar-ingrediente.component";
import {AtualizarReceitaComponent} from "./components/atualizar-receita/atualizar-receita.component";
import {LoginComponent} from "./components/login/login.component";
import {CadastroComponent} from "./components/cadastro/cadastro.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/atualizar/:id', component: AtualizarReceitaComponent },
  { path: 'ingredientes', component: IngredientesComponent },
  { path: 'ingredientes/atualizar/:id', component: SalvarIngredienteComponent },
  { path: 'ingredientes/novo', component: SalvarIngredienteComponent },
  { path: 'nova-receita', component: CadastraReceitaComponent},
  { path: 'login', component: LoginComponent},
  { path: 'cadastrar', component: CadastroComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

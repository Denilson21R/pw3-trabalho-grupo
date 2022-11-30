import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Receita} from "./app/model/Receita";
import {Ingrediente} from "./app/model/Ingrediente";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  baseURL = "https://tc2-backend-livro-receitas.glitch.me/api"

  //busca todas as receitas
  getAllReceitas() {
    return this.http.get<Receita[]>(this.baseURL+"/receita", {observe:"response"})
  }

  //busca todos os ingredientes
  getAllIngredientes(){
    return this.http.get<Ingrediente[]>(this.baseURL+"/ingrediente", {observe: "response"})
  }

  //deleta a receita escolhida
  deleteReceita(receita: Receita) {
    return this.http.delete(this.baseURL+"/receita/"+receita._id, {observe: "response"})
  }

  //deleta o ingrediente escolhido
  deletaIngrediente(ingrediente: Ingrediente) {
    return this.http.delete(this.baseURL+"/ingrediente/"+ingrediente._id, {observe: "response"})
  }

  //busca o ingrediente por ID
  getIngredienteById(id_ingrediente: String) {
    return this.http.get<Ingrediente>(this.baseURL+"/ingrediente/"+id_ingrediente, {observe: "response"})
  }

  //atualizada o ingrediente escolhido
  updateIngrediente(id: string, nome: string, quantidade: number, unidade: string) {
    let ingredienteData = new HttpParams();

    ingredienteData = ingredienteData.set("nome", nome);
    ingredienteData = ingredienteData.set("quantidade", quantidade);
    ingredienteData = ingredienteData.set("unidade", unidade);

    return this.http.put(this.baseURL+"/ingrediente/"+id, ingredienteData, {observe:"response"});
  }

  //adiciona um novo ingrediente
  addIngrediente(nome: string, quantidade: number, unidade: string) {
    let ingredienteData = new HttpParams();
    
    ingredienteData = ingredienteData.set("nome", nome);
    ingredienteData = ingredienteData.set("quantidade", quantidade);
    ingredienteData = ingredienteData.set("unidade", unidade);
    
    return this.http.post(this.baseURL+"/ingrediente", ingredienteData, {observe: "response"});
  }

  //adiciona uma receita
  //TODO: Back-end nn ta gostando de eu mandar os Ingredientes como string
  addReceita(nome : string, minutos_preparo : number, modo_preparo : string, estacao_ano : string, ingredientes : Ingrediente[]) {
    let receitaData = new HttpParams();
    
    receitaData = receitaData.set("nome", nome);
    receitaData = receitaData.set("minutos_preparo", minutos_preparo);
    receitaData = receitaData.set("modo_preparo", modo_preparo);
    receitaData = receitaData.set("Ingredientes", JSON.stringify(ingredientes))
    receitaData = receitaData.set("estacao_ano", estacao_ano);


    return this.http.post(this.baseURL+"/receita", receitaData, {observe: "response"});
  }
}

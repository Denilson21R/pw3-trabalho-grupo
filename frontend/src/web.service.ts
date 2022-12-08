import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Receita} from "./app/model/Receita";
import {Ingrediente} from "./app/model/Ingrediente";
import {Usuario} from "./app/model/Usuario";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  baseURL = "http://localhost:8080/api"

  getAllReceitas() {
    return this.http.get<Receita[]>(this.baseURL+"/receita", {observe:"response"})
  }

  getReceitasUsuario(id: number) {
    return this.http.get<Receita[]>(this.baseURL+"/usuario/"+id+"/receitas", {observe:"response"})
  }

  getAllIngredientes(){
    return this.http.get<Ingrediente[]>(this.baseURL+"/ingrediente", {observe: "response"})
  }

  deleteReceita(receita: Receita) {
    return this.http.delete(this.baseURL+"/receita/"+receita.id, {observe: "response"})
  }

  getIngredienteById(id_ingrediente: String) {
    return this.http.get<Ingrediente>(this.baseURL+"/ingrediente/"+id_ingrediente, {observe: "response"})
  }

  updateIngrediente(id: string, nome: string, quantidade: number, unidade: string, status: string) {
    let ingredienteData = new HttpParams();

    ingredienteData = ingredienteData.set("nome", nome);
    ingredienteData = ingredienteData.set("quantidade", quantidade);
    ingredienteData = ingredienteData.set("unidade", unidade);
    ingredienteData = ingredienteData.set("status", status);
    return this.http.put(this.baseURL+"/ingrediente/"+id, ingredienteData, {observe:"response"});
  }

  addIngrediente(nome: string, quantidade: number, unidade: string) {
    let ingredienteData = new HttpParams();
    ingredienteData = ingredienteData.set("nome", nome);
    ingredienteData = ingredienteData.set("quantidade", quantidade);
    ingredienteData = ingredienteData.set("unidade", unidade);
    ingredienteData = ingredienteData.set("status", "0");
    return this.http.post(this.baseURL+"/ingrediente", ingredienteData, {observe: "response"});
  }

  addReceita(nome : string, minutos_preparo : number, modo_preparo : string, estacao_ano : string, ingredientes : String[]) {
    let receitaData = new HttpParams();
    receitaData = receitaData.set("nome", nome);
    receitaData = receitaData.set("tempo_de_preparo", minutos_preparo);
    receitaData = receitaData.set("modo_preparo", modo_preparo);
    receitaData = receitaData.set("estacao_ano", estacao_ano);
    receitaData = receitaData.set("criador", sessionStorage.getItem("id"));
    receitaData = receitaData.set("ingredientes", ingredientes.join(","))
    return this.http.post(this.baseURL+"/receita", receitaData, {observe: "response"});
  }

  getReceitaById(id_receita: string) {
    return this.http.get<Receita>(this.baseURL+"/receita/"+id_receita, {observe: "response"})
  }

  atualizarReceita(id: string, nome: string, modo_de_preparo: string, tempo_de_preparo: number, estacao_ano: string) {
    let receitaData = new HttpParams();
    receitaData = receitaData.set("nome", nome);
    receitaData = receitaData.set("tempo_de_preparo", tempo_de_preparo);
    receitaData = receitaData.set("modo_preparo", modo_de_preparo);
    receitaData = receitaData.set("estacao_ano", estacao_ano);
    return this.http.put(this.baseURL+"/receita/"+id, receitaData, {observe:"response"});
  }

  login(login: string, senha: string) {
    let loginData = new HttpParams();
    loginData = loginData.set("login", login);
    loginData = loginData.set("senha", senha);
    return this.http.post<Usuario>(this.baseURL+"/usuario/auth", loginData, {observe: "response"})
  }

  cadastro(nome: string, login: string, senha: string) {
    let cadastroData = new HttpParams();
    cadastroData = cadastroData.set("login", login);
    cadastroData = cadastroData.set("senha", senha);
    cadastroData = cadastroData.set("nome", nome);
    return this.http.post<Usuario>(this.baseURL+"/usuario", cadastroData, {observe:"response"})
  }
}

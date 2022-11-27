import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Receita} from "./app/model/Receita";
import {Ingrediente} from "./app/model/Ingrediente";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  baseURL = "https://tc2-backend-livro-receitas.glitch.me/api"

  getAllReceitas() {
    return this.http.get<Receita[]>(this.baseURL+"/receita", {observe:"response"})
  }

  getAllIngredientes(){
    return this.http.get<Ingrediente[]>(this.baseURL+"/ingrediente", {observe: "response"})
  }

  deleteReceita(receita: Receita) {
    return this.http.delete(this.baseURL+"/receita/"+receita._id, {observe: "response"})
  }

  deletaIngrediente(ingrediente: Ingrediente) {
    return this.http.delete(this.baseURL+"/ingrediente/"+ingrediente._id, {observe: "response"})
  }
}

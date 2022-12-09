import { Component, OnInit } from '@angular/core';
import {WebService} from "../../../web.service";
import {Receita} from "../../model/Receita";
import {Router} from "@angular/router";
import {toast} from "bulma-toast";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  receitas!: Receita[]

  constructor(private web: WebService, private router: Router) { }

  ngOnInit(): void {
    this.fillReceitas();
  }

  private fillReceitas() {
    let id = Number(sessionStorage.getItem("id"))
    if(id != null){
      this.web.getReceitasUsuario(id).subscribe((response) => {
        if (response.ok) {
          this.receitas = response.body!
        } else {
          toast({
            message: 'Ocorreu um erro ao obter as receitas',
            duration: 2000,
            type: 'is-danger'
          })
        }
      })
    }else{
      this.router.navigate(["login"])
    }
  }

  deletaReceita(receita: Receita) {
    this.web.deleteReceita(receita).subscribe((response)=>{
      if(response.ok){
        toast({
          message: 'Receita deletada com sucesso',
          duration: 2000,
          type: 'is-success'
        })
        this.fillReceitas()
      }else{
        toast({
          message: 'Ocorreu um erro ao deletar a receita',
          duration: 2000,
          type: 'is-danger'
        })
      }
    })
  }
}

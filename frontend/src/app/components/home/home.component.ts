import { Component, OnInit } from '@angular/core';
import {WebService} from "../../../web.service";
import {Receita} from "../../model/Receita";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  receitas!: Receita[]

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.fillReceitas();
  }

  private fillReceitas() {
    this.web.getAllReceitas().subscribe((response) => {
      if (response.ok) {
        this.receitas = response.body!
      } else {
        alert("Ocorreu um erro ao obter as receitas");
      }
    })
  }

  deletaReceita(receita: Receita) {
    this.web.deleteReceita(receita).subscribe((response)=>{
      if(response.ok){
        alert("Receita deletada com sucesso");
        this.fillReceitas()
      }else{
        alert("Ocorreu um erro ao deletar a receita");
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {Receita} from "../../model/Receita";
import {WebService} from "../../../web.service";
import {toast} from "bulma-toast";

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit {
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
        toast({
          message: 'Ocorreu um erro ao obter as receitas',
          duration: 2000,
          type: 'is-danger'
        })
      }
    })
  }

}

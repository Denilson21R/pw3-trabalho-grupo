import { Component, OnInit } from '@angular/core';
import {Ingrediente} from "../../model/Ingrediente";
import {WebService} from "../../../web.service";
import {toast} from "bulma-toast";

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.scss']
})
export class IngredientesComponent implements OnInit {
  ingredientes!: Ingrediente[]

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.fillIngredientes();
  }

  private fillIngredientes() {
    this.web.getAllIngredientes().subscribe((response) => {
      if (response.ok) {
        this.ingredientes = response.body!
      } else {
        toast({
          message: 'Ocorreu um erro ao obter os ingredientes',
          duration: 2000,
          type: 'is-danger'
        })
      }
    })
  }
}

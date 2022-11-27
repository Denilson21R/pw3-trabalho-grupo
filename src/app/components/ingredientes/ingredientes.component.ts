import { Component, OnInit } from '@angular/core';
import {Ingrediente} from "../../model/Ingrediente";
import {WebService} from "../../../web.service";

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
        alert("Ocorreu um erro ao obter os ingredientes");
      }
    })
  }

  deletaIngrediente(ingrediente: Ingrediente) {
    this.web.deletaIngrediente(ingrediente).subscribe((response)=>{
      if(response.ok){
        alert("Ingrediente deletado com sucesso");
        this.fillIngredientes()
      }else{
        alert("Ocorreu um erro ao deletar o ingrediente");
      }
    })
  }
}

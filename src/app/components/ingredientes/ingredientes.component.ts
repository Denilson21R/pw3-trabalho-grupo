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

  //popula a tabela com os ingredientes do sistema
  private fillIngredientes() {

    //.. usando o service
    this.web.getAllIngredientes().subscribe((response) => {
      
      //se der tudo certo, preenche com as infos recebidas
      if (response.ok) {
        this.ingredientes = response.body!
      
      //caso n/, demonstra a falha pro usuário
      } else {
        alert("Ocorreu um erro ao obter os ingredientes");
      }
    
    })
  }

  //deleta um dos ingredientes da tabela
  deletaIngrediente(ingrediente: Ingrediente) {

    //.. usando o service
    this.web.deletaIngrediente(ingrediente).subscribe((response)=>{
      
      //se der tudo certo, o ingrediente foi deletado
      if(response.ok){

        //demonstra isso pro usuário
        alert("Ingrediente deletado com sucesso");
        
        this.fillIngredientes(); //.. e uma nova tabela é populada para ser mostrada
      
      //caso n/, demonstra a falha pro usuário
      }else{
        alert("Ocorreu um erro ao deletar o ingrediente");
      }
    
    })
  
  }
}

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

  //popula a tabela com as receitas do sistema
  private fillReceitas() {
    
    //.. usando o service
    this.web.getAllReceitas().subscribe((response) => {
      
      //se der tudo certo, preenche com as infos recebidas
      if (response.ok) {
        this.receitas = response.body!

      //caso n/, demonstra a falha pro usuário
      } else {
        alert("Ocorreu um erro ao obter as receitas");
      }
    
    })
  }

  //deleta uma das receitas da tabela
  deletaReceita(receita: Receita) {

    //.. usando o service
    this.web.deleteReceita(receita).subscribe((response)=>{
      
      //se der tudo certo, o ingrediente foi deletado
      if(response.ok){

        //demonstra isso pro usuário
        alert("Receita deletada com sucesso");
        
        this.fillReceitas(); //.. e uma nova tabela é populada para ser mostrada
      
      //caso n/, demonstra a falha pro usuário
      }else{
        alert("Ocorreu um erro ao deletar a receita");
      }
    
    })
  }
}

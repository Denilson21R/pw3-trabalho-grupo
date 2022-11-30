import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Ingrediente} from "../../model/Ingrediente";
import {WebService} from "../../../web.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-salvar-ingrediente',
  templateUrl: './salvar-ingrediente.component.html',
  styleUrls: ['./salvar-ingrediente.component.scss']
})
export class SalvarIngredienteComponent implements OnInit {
  
  ingrediente: Ingrediente = new Ingrediente()
  formIngrediente!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private web: WebService
  ) { }

  ngOnInit(): void {
    const id_ingrediente = this.route.snapshot.paramMap.get('id');
    
    //se o id do ingrediente existe
    if(id_ingrediente != null){
      
      this.initForm(); //comeca o forms pra atualizacao..
      this.getIngredienteById(id_ingrediente); //.. e busca ele para a modificacao dos dados
    
    //caso nn..
    }else{
      this.initForm(); //só inicia o forms pra adição
    }
  }

  //busca o ingrediente por id
  private getIngredienteById(id_ingrediente: string) {
    
    //...por meio do service
    this.web.getIngredienteById(id_ingrediente!).subscribe((response) => {
      
      //se achar, popula o ingrediente com os dados achados
      if (response.ok) {
        this.ingrediente = response.body!
      
      
      //caso contrario, mostra uma falha
      } else {
        alert("Ocorreu um erro ao obter o ingrediente");
      }
      
      this.initForm();
    
    })
  
  }

  //inicia o formulario pra inserção das atualizações
  private initForm() {
    
    this.formIngrediente = new FormGroup({
      nome: new FormControl(this.ingrediente.nome, [Validators.required, Validators.minLength(2)]),
      quantidade: new FormControl(this.ingrediente.quantidade, [Validators.required, Validators.min(1)]),
      unidade: new FormControl(this.ingrediente.unidade, [Validators.required])
    });
  
  }

  //busca as informções do nome/quantidade/unidade pelos inputs no forms
  get nome() { return this.formIngrediente.get('nome')!; }
  get quantidade() { return this.formIngrediente.get('quantidade')!; }
  get unidade() { return this.formIngrediente.get('unidade')!; }

  //salva os ingredientes
  salvarIngrediente() {
    
    //..caso forem validos
    if(this.formIngrediente.valid){
      
      //se o id já existe, só modifica o ingrediente
      if(this.ingrediente._id != null){
        this.updateIngrediente();
      
      //caso contrario, adiciona um novo
      }else{
        this.addIngrediente();
      }
    }
  
  }

  //adiciona um ingrediente novo no servidor
  private addIngrediente() {
    
    //..por meio do service
    this.web.addIngrediente(
      this.formIngrediente.controls["nome"].value,
      this.formIngrediente.controls["quantidade"].value,
      this.formIngrediente.controls["unidade"].value
    ).subscribe((response) => {
      
      //se for bem-sucedido, demonstra pro usuário...
      if (response.ok) {
        alert("Ingrediente salvo com sucesso")
        
        //.. e volta pra tela de ingredientes
        this.router.navigate(["/ingredientes"])
      
      //caso contrario, mostra falha
      } else {
        alert("Ocorreu um erro ao salvar o ingrediente")
      }
    
    })
  }

  //atualiza as infos do ingrediente
  private updateIngrediente() {
    
    //.. pelo service
    this.web.updateIngrediente(
      this.ingrediente._id,
      this.formIngrediente.controls["nome"].value,
      this.formIngrediente.controls["quantidade"].value,
      this.formIngrediente.controls["unidade"].value
    ).subscribe((response) => {
      
      //se for bem-sucedido, demonstra pro usuário...
      if (response.ok) {
        alert("Ingrediente atualizado com sucesso")
        
        //.. e volta pra tela de ingredientes
        this.router.navigate(["/ingredientes"])
      
      //caso contrario, mostra falha
      } else {
        alert("Ocorreu um erro ao atualizar o ingrediente")
      }
    
    })
  }
}

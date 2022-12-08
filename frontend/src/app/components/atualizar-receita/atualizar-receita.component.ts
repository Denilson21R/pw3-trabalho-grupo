import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {WebService} from "../../../web.service";
import {Receita} from "../../model/Receita";
import {Ingrediente} from "../../model/Ingrediente";

@Component({
  selector: 'app-atualizar-receita',
  templateUrl: './atualizar-receita.component.html',
  styleUrls: ['./atualizar-receita.component.scss']
})
export class AtualizarReceitaComponent implements OnInit {
  formReceita !: FormGroup
  receita : Receita = new Receita()
  ingredientes!: Ingrediente[]

  constructor(private route: ActivatedRoute, private web: WebService, private router: Router) { }

  ngOnInit(): void {
    const id_receita = this.route.snapshot.paramMap.get('id')
    this.initForm();
    if(id_receita != null){
      this.fillReceita(id_receita)
    }
    this.fillIngredientes()
  }

  private initForm() {
    this.formReceita = new FormGroup({
      nome: new FormControl(this.receita.nome, [Validators.required, Validators.minLength(2)]),
      minutos_preparo: new FormControl(this.receita.tempo_de_preparo, [Validators.required, Validators.min(1)]),
      modo_preparo: new FormControl(this.receita.modo_de_preparo, [Validators.required, Validators.minLength(15)]),
      estacao_ano: new FormControl(this.receita.estacao_ano, [Validators.required, Validators.minLength(5)])
    });
  }

  get nome() { return this.formReceita.get('nome')!; }
  get minutos_preparo() { return this.formReceita.get('minutos_preparo')!; }
  get modo_preparo() { return this.formReceita.get('modo_preparo')!; }
  get estacao_ano() { return this.formReceita.get('estacao_ano')!; }

  private fillIngredientes() {
    this.web.getAllIngredientes().subscribe((response) => {
      if (response.ok) {
        this.ingredientes = response.body!;
      } else {
        alert("Ocorreu um erro ao obter os ingredientes");
      }
    })
  }

  salvarReceita() {
    this.web.atualizarReceita(this.receita).subscribe((response)=>{
      if(response.ok){
        alert("Receita atualizada com sucesso");
        this.router.navigate(["/home"]);
      }else{
        alert("Ocorreu um erro ao atualizar a receita!")
      }
    })
  }

  private fillReceita(id: string) {
    this.web.getReceitaById(id).subscribe((response)=>{
      if(response.ok){
        this.receita = response.body
        this.initForm()
      }else{
        alert('Ocorreu um erro ao obter a receita')
      }
    })
  }
}

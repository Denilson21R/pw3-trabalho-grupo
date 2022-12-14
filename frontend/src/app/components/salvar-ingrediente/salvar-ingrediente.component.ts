import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Ingrediente} from "../../model/Ingrediente";
import {WebService} from "../../../web.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {toast} from "bulma-toast";

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
    const id_ingrediente = this.route.snapshot.paramMap.get('id')
    if(id_ingrediente != null){
      this.initForm();
      this.getIngredienteById(id_ingrediente);
    }else{
      this.initForm();
    }
  }

  private getIngredienteById(id_ingrediente: string) {
    this.web.getIngredienteById(id_ingrediente!).subscribe((response) => {
      if (response.ok) {
        this.ingrediente = response.body!
      } else {
        toast({
          message: 'Ocorreu um erro ao obter o ingrediente',
          duration: 2000,
          type: 'is-danger'
        })
      }
      this.initForm();
    })
  }

  private initForm() {
    this.formIngrediente = new FormGroup({
      nome: new FormControl(this.ingrediente.nome, [Validators.required, Validators.minLength(2)]),
      quantidade: new FormControl(this.ingrediente.quantidade, [Validators.required, Validators.min(1)]),
      unidade: new FormControl(this.ingrediente.unidade, [Validators.required]),
      status: new FormControl(null, [])
    });
  }

  get nome() { return this.formIngrediente.get('nome')!; }
  get quantidade() { return this.formIngrediente.get('quantidade')!; }
  get unidade() { return this.formIngrediente.get('unidade')!; }

  salvarIngrediente() {
    if(this.formIngrediente.valid){
      if(this.ingrediente.id != null){
        this.updateIngrediente();
      }else{
        this.addIngrediente();
      }
    }
  }

  private addIngrediente() {
    this.web.addIngrediente(
      this.formIngrediente.controls["nome"].value,
      this.formIngrediente.controls["quantidade"].value,
      this.formIngrediente.controls["unidade"].value
    ).subscribe((response) => {
      if (response.ok) {
        toast({
          message: 'Ingrediente salvo com sucesso',
          duration: 2000,
          type: 'is-success'
        })
        this.router.navigate(["/ingredientes"])
      } else {
        toast({
          message: 'Ocorreu um erro ao salvar o ingrediente',
          duration: 2000,
          type: 'is-danger'
        })
      }
    })
  }

  private updateIngrediente() {
    this.web.updateIngrediente(
      this.ingrediente.id,
      this.formIngrediente.controls["nome"].value,
      this.formIngrediente.controls["quantidade"].value,
      this.formIngrediente.controls["unidade"].value,
      this.formIngrediente.controls["status"].value
    ).subscribe((response) => {
      if (response.ok) {
        alert("Ingrediente atualizado com sucesso")
        this.router.navigate(["/ingredientes"])
      } else {
        alert("Ocorreu um erro ao atualizar o ingrediente")
      }
    })
  }
}

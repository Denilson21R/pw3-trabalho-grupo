import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WebService} from "../../../web.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  formCadastro: FormGroup;

  constructor(private web: WebService) { }

  ngOnInit(): void {
    this.initForm()
  }

  register() {
    if(this.formCadastro.valid){
      this.web.cadastro(
        this.formCadastro.controls["nome"].value,
        this.formCadastro.controls["login"].value,
        this.formCadastro.controls["senha"].value
      ).subscribe((response)=>{
        if(response.ok){
          alert("salvo com sucesso!")
        }else{
          alert("erro")
        }
      })
    }else{
      alert("faltam dados")
    }
  }

  private initForm() {
    this.formCadastro = new FormGroup({
      nome: new FormControl(
        null,
        [Validators.required, Validators.minLength(2)]
      ),
      login: new FormControl(
        null,
        [Validators.required, Validators.minLength(5)]
      ),
      senha: new FormControl(
        null,
        [Validators.required, Validators.minLength(6)]
      ),
    })
  }

  get nome() { return this.formCadastro.get('nome')!; }
  get login() { return this.formCadastro.get('login')!; }
  get senha() { return this.formCadastro.get('senha')!; }
}

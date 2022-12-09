import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../model/Usuario";
import {WebService} from "../../../web.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {toast} from "bulma-toast";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private web: WebService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  loginForm() {
    if(this.formLogin.valid){
      this.web.login(
        this.formLogin.controls["login"].value,
        this.formLogin.controls["senha"].value
      ).subscribe((response)=>{
        if(response.ok){
          this.setSessionUserData(response);
          this.router.navigate(['home'])
        }else{
          toast({
            message: 'Ocorreu um erro ao realizar o login',
            duration: 2000,
            type: 'is-danger'
          })
        }
      })
    }else{
      toast({
        message: 'Campos obrigatórios não foram preenchidos',
        duration: 2000,
        type: 'is-danger'
      })
    }
  }

  private setSessionUserData(response: HttpResponse<Usuario>) {
    sessionStorage.setItem("id", String(response.body.id))
    sessionStorage.setItem("login", String(response.body.login))
    sessionStorage.setItem("nome", String(response.body.nome))
  }

  private initForm() {
    this.formLogin = new FormGroup({
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

  get login() { return this.formLogin.get('login')!; }
  get senha() { return this.formLogin.get('senha')!; }
}

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
    this.web.getAllReceitas().subscribe((response)=>{
      if(response.ok){
        this.receitas = response.body!
      }else{
        //TODO: show alert with error
      }
    })
  }

}

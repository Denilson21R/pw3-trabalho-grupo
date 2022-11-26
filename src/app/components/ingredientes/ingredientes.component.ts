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
    this.web.getAllIngredientes().subscribe((response)=>{
      if(response.ok){
        this.ingredientes = response.body!
      }else{
        //TODO: show alert with error
      }
    })
  }

}

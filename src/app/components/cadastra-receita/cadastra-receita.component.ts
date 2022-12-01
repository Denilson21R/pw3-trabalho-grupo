import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingrediente } from 'src/app/model/Ingrediente';
import { Receita } from 'src/app/model/Receita';
import { WebService } from 'src/web.service';

@Component({
  selector: 'app-cadastra-receita',
  templateUrl: './cadastra-receita.component.html',
  styleUrls: ['./cadastra-receita.component.scss']
})
export class CadastraReceitaComponent implements OnInit {

  ingredientes!: Ingrediente[]
  receita : Receita = new Receita()
  ingredientesReceita: Ingrediente[] = []
  formReceita !: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private web: WebService) { }

  ngOnInit(): void {
    this.fillIngredientes()
    this.initForm();
  }

  private initForm() {
    this.formReceita = new FormGroup({
      nome: new FormControl(this.receita.nome, [Validators.required, Validators.minLength(2)]),
      ingredientes: new FormControl(null, []),
      minutos_preparo: new FormControl(this.receita.minutos_preparo, [Validators.required, Validators.min(1)]),
      modo_preparo: new FormControl(this.receita.modo_preparo, [Validators.required, Validators.minLength(15)]),
      estacao_ano: new FormControl(this.receita.estacao_ano, [Validators.required, Validators.minLength(5)])
    });
  }

  get nome() { return this.formReceita.get('nome')!; }
  get minutos_preparo() { return this.formReceita.get('minutos_preparo')!; }
  get modo_preparo() { return this.formReceita.get('modo_preparo')!; }
  get estacao_ano() { return this.formReceita.get('estacao_ano')!; }

  salvarReceita() {
    if(this.formReceita.valid && this.ingredientesReceita.length > 0){
      this.addReceita();
    } else {
      alert("Receita inválida.");
    }
  }

  private addReceita() {
    this.web.addReceita(
      this.formReceita.controls["nome"].value,
      this.formReceita.controls["minutos_preparo"].value,
      this.formReceita.controls["modo_preparo"].value,
      this.formReceita.controls["estacao_ano"].value,
      this.converteArrayId(this.ingredientesReceita)
    ).subscribe((response) => {
      if (response.ok) {
        alert("Receita salva com sucesso");
        this.router.navigate(["/home"]);
      } else {
        alert("Ocorreu um erro ao salvar a receita");
      }
    })
  }

  //popula os ingredientes disponiveis
  private fillIngredientes() {
    this.web.getAllIngredientes().subscribe((response) => {
      if (response.ok) {
        this.ingredientes = response.body!;
      } else {
        alert("Ocorreu um erro ao obter os ingredientes");
      }
    })
  }

  addIngredienteNaReceita(ingrediente: Ingrediente) {
    if(!this.ingredientesReceita.includes(ingrediente)) {
      this.ingredientesReceita.push(ingrediente)
    }
  }

  addIngrediente() {
    let ingredienteAdd = this.formReceita.controls["ingredientes"].value
    this.ingredientes.forEach((ingredienteVerificar)=>{
      if(ingredienteVerificar._id == ingredienteAdd){
        this.addIngredienteNaReceita(ingredienteVerificar)
      }
    })
    this.formReceita.controls["ingredientes"].reset()
  }

  excluirIngredienteDaReceita(ingredienteReceita: Ingrediente) {
    const index: number = this.ingredientesReceita.indexOf(ingredienteReceita);
    if (index !== -1) {
      this.ingredientesReceita.splice(index, 1);
    }
  }

  private converteArrayId(ingredientesReceita: Ingrediente[]) {
    let arrayId: String[] = []
    ingredientesReceita.forEach((objetoCompletoIngrediente)=>{
      arrayId.push(objetoCompletoIngrediente._id)
    })
    return arrayId;
  }
}

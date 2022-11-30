import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  ingrediente : Ingrediente = new Ingrediente();
  nomeIngrediente : string = '';
  qtdIngrediente : number = 0;

  ingredientes!: Ingrediente[];
  ingredientesPrepared : string[];
  ingredientesSelecionados : Ingrediente[] = [];

  receita : Receita = new Receita();
  formReceita !: FormGroup;

  get nome() { return this.formReceita.get('nome')!; }
  get minutos_preparo() { return this.formReceita.get('minutos_preparo')!; }
  get modo_preparo() { return this.formReceita.get('modo_preparo')!; }
  get estacao_ano() { return this.formReceita.get('estacao_ano')!; }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private web: WebService) { }

  //TODO: receber 'Receitas' por meio de Array
  private initForm() {
    this.formReceita = new FormGroup({

      nome: new FormControl(this.receita.nome, [Validators.required, Validators.minLength(2)]),
      minutos_preparo: new FormControl(this.receita.minutos_preparo, [Validators.required, Validators.min(1)]),
      modo_preparo: new FormControl(this.receita.modo_preparo, [Validators.required, Validators.minLength(15)]),
      estacao_ano: new FormControl(this.receita.estacao_ano, [Validators.required, Validators.minLength(5)])

    });
  }

  salvarReceita() {
    //alert("clicou");

    if(this.formReceita.valid && this.ingredientesSelecionados.length > 0){
      this.addReceita();
    
    } else {
      alert("Receita inválida.");
    }
  }

  private addReceita() {

    alert("addentrado");

    this.web.addReceita(
      this.formReceita.controls["nome"].value,
      this.formReceita.controls["minutos_preparo"].value,
      this.formReceita.controls["modo_preparo"].value,
      this.formReceita.controls["estacao_ano"].value,
      this.ingredientesSelecionados
    ).subscribe((response) => {

      alert("webbado");

      if (response.ok) {
        alert("Receita salva com sucesso");
        this.router.navigate(["/home"]);

      } else {
        alert("Ocorreu um erro ao salvar a receita");
      }

    })
  }


  // -- | Ingredientes | --

  //popula os ingredientes disponiveis
  private fillIngredientes() {
    this.web.getAllIngredientes().subscribe((response) => {
      if (response.ok) {
        this.ingredientes = response.body!;

        this.ingredientesPrepared = this.ingredientes.map(elem => {
          return elem.nome;
        })

        this.nomeIngrediente = this.ingredientesPrepared[0];

        console.log("newzes: ", this.ingredientesPrepared);

      } else {
        alert("Ocorreu um erro ao obter os ingredientes");
      }
    })
  }

  //adiciona cada ingrediente selecionado pelo o usuario
  protected adicionaIngredienteReceita() {

    if(this.qtdIngrediente > 0 && this.nomeIngrediente != undefined) {

      console.log('até antes: ', this.ingredientesSelecionados)

      if(this.ingredienteNaReceita(this.nomeIngrediente)) {
        alert('Ingrediente já está na receita!');
      
      } else {
        this.ingredientesSelecionados.push(
          {
            _id: '', 
            nome: this.nomeIngrediente, 
            quantidade: this.qtdIngrediente, 
            unidade: ''
          }
        );
      }

      console.log('até agora: ', this.ingredientesSelecionados)
    
    } else {
      alert('Quantidade inválida.');

    }
  }

  //verifica se o ingrediente já existe na receita
  ingredienteNaReceita(ingrediente : string) : boolean {
    let existe : boolean = false;

    this.ingredientesSelecionados.forEach(elem => {
      if(elem.nome.includes(this.nomeIngrediente)) {
        existe = true;
      }
    })

    return existe;
  }

  //muda o ingrediente que foi selecionado
  mudaIngrediente(event : any) {
    this.nomeIngrediente = event.target.value;

  }

  //remove um dos ingredientes selecionados
  protected removeIngredienteReceita(nomeIngrediente : string) {
    
    console.log('antes ingre: ', this.ingredientesSelecionados);
    
    this.ingredientesSelecionados.forEach((opcao, index) => {
      if(opcao.nome == nomeIngrediente) {
        this.ingredientesSelecionados.splice(index, 1);
      }
    })

    console.log('dps ingrs: ', this.ingredientesSelecionados);

  }
  // -- | // | --

  ngOnInit(): void {
    this.initForm();
    this.fillIngredientes();
  }

}

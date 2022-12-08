import {Usuario} from "./Usuario";
import {Ingrediente} from "./Ingrediente";

export class Receita{
  id!: string
  nome!: string
  tempo_de_preparo!: number
  modo_de_preparo: string
  estacao_ano!: string
  criador!: Usuario
  ingredientes?: Ingrediente[]
}

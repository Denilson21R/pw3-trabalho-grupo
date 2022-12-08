import {Ingrediente} from "./Ingrediente";

export class Receita{
  id!: string
  nome!: string
  tempo_de_preparo!: number
  ingredientes!: Ingrediente[]
  estacao_ano?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

import {Ingrediente} from "./Ingrediente";

export class Receita{
  _id!: string
  nome!: string
  minutos_preparo!: number
  modo_preparo!: string
  ingredientes!: Ingrediente[]
  estacao_ano?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

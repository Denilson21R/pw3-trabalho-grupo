//formato de um ingrediente | _id/createdAt/updatedAt/__v são populados pelo servidor
export class Ingrediente{
  _id!: string
  nome!: string
  quantidade!:number
  unidade!:string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

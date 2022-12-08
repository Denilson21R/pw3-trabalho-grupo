#### 1. GET ```/api/usuario/{id}```
- Parêmetros

|  nome  | obrigatório |     tipo      | 
|:------:|:-----------:|:-------------:|
|   id   | obrigatório | string na url |

- Retornos

|     dados      | status |        condição        |
|:--------------:|:------:|:----------------------:|
| objeto usuario |  200   |        sucesso         |
|                |  422   | usuário não encontrado |
|                |  500   |          erro          |


#### 2. POST ```/api/usuario```
- Parêmetros

| nome  | obrigatório |  tipo  | 
|:-----:|:-----------:|:------:|
| nome  | obrigatório | string |
| login | obrigatório | string |
| senha | obrigatório | string |

- Retornos

|     dados      | status |        condição        |
|:--------------:|:------:|:----------------------:|
| objeto usuario |  201   |        sucesso         |
|                |  500   |          erro          |
|                |  422   | ausência de parâmetros |


#### 3. POST ```/api/usuario/auth```
- Parêmetros

| nome  | obrigatório |  tipo  | 
|:-----:|:-----------:|:------:|
| login | obrigatório | string |
| senha | obrigatório | string |

- Retornos

|     dados      | status |        condição        |
|:--------------:|:------:|:----------------------:|
| objeto usuario |  200   |        sucesso         |
|                |  500   |          erro          |
|                |  422   | ausência de parâmetros |
|                |  422   |    senha incorreta     |


#### 4. PUT ```/api/usuario/{id}```
- Parêmetros

| nome  | obrigatório |     tipo      | 
|:-----:|:-----------:|:-------------:|
|  id   | obrigatório | string na url |
| nome  | obrigatório |    string     |
| login | obrigatório |    string     |
| senha | obrigatório |    string     |

- Retornos

|     dados      | status |        condição        |
|:--------------:|:------:|:----------------------:|
| objeto usuario |  200   |        sucesso         |
|                |  500   |          erro          |
|                |  422   | ausência de parâmetros |
|                |  422   | usuário não encontrado |


#### 5. GET ```/api/ingrediente```
- Parêmetros
    - Nenhum parâmetro necessário

- Retornos

|            dados             | status |        condição        |
|:----------------------------:|:------:|:----------------------:|
| lista de objetos ingrediente |  200   |        sucesso         |
|                              |  500   |          erro          |


#### 6. GET ```/api/ingrediente/{id}```
- Parêmetros

| nome  | obrigatório |     tipo      |
|:-----:|:-----------:|:-------------:|
|  id   | obrigatório | string na url |

- Retornos

|       dados        | status |          condição          |
|:------------------:|:------:|:--------------------------:|
| objeto ingrediente |  200   |          sucesso           |
|                    |  500   |            erro            |
|                    |  422   | ingrediente nao encontrado |


#### 7. POST ```/api/ingrediente```
- Parêmetros

|    nome    | obrigatório |  tipo   |
|:----------:|:-----------:|:-------:|
|    nome    | obrigatório | string  |
| quantidade | obrigatório | inteiro |
|  unidade   | obrigatório | string  |

- Retornos

|       dados        | status |        condição        |
|:------------------:|:------:|:----------------------:|
| objeto ingrediente |  201   |        sucesso         |
|                    |  500   |          erro          |
|                    |  422   | ausência de parâmetros |


#### 8. PUT ```/api/ingrediente/{id}```
- Parêmetros

|    nome    | obrigatório |          tipo          |
|:----------:|:-----------:|:----------------------:|
|     id     | obrigatório |     string na url      |
|    nome    | obrigatório |         string         |
| quantidade | obrigatório |        inteiro         |
|  unidade   | obrigatório |         string         |
|   status   | obrigatório | 0 = ativo, 1 = inativo |

- Retornos

|       dados        | status |          condição          |
|:------------------:|:------:|:--------------------------:|
| objeto ingrediente |  200   |          sucesso           |
|                    |  500   |            erro            |
|                    |  422   |   ausência de parâmetros   |
|                    |  422   | ingrediente não encontrado |


#### 9. GET ```/api/receita```
- Parêmetros
    - Nenhum parâmetro necessário

- Retornos

|          dados           | status |        condição        |
|:------------------------:|:------:|:----------------------:|
| lista de objetos receita |  200   |        sucesso         |
|                          |  500   |          erro          |


#### 10. GET ```/api/receita/{id}```
- Parêmetros

| nome  | obrigatório |     tipo      |
|:-----:|:-----------:|:-------------:|
|  id   | obrigatório | string na url |

- Retornos

|     dados      | status |        condição        |
|:--------------:|:------:|:----------------------:|
| objeto receita |  200   |        sucesso         |
|                |  500   |          erro          |
|                |  422   | receita não encontrada |

#### 11. GET ```/api/usuario/{id}/receitas```
- Parêmetros

| nome  | obrigatório |     tipo      |
|:-----:|:-----------:|:-------------:|
|  id   | obrigatório | string na url |

- Retornos

|          dados           | status |        condição        |
|:------------------------:|:------:|:----------------------:|
| lista de objetos receita |  200   |        sucesso         |
|                          |  500   |          erro          |
|                          |  422   | receita não encontrada |


#### 12. POST ```/api/receita```
- Parêmetros

|       nome       | obrigatório |                        tipo                        |
|:----------------:|:-----------:|:--------------------------------------------------:|
|       nome       | obrigatório |                       string                       |
| tempo_de_preparo | obrigatório |                      inteiro                       |
|   estacao_ano    | obrigatório |                       string                       |
|   modo_preparo   | obrigatório |                       string                       |
|     criador      | obrigatório |                      inteiro                       |
|   ingredientes   | obrigatório | string com ids separados por vírgula (ex. '1,3,5') |

- Retornos

|     dados      | status |        condição        |
|:--------------:|:------:|:----------------------:|
| objeto receita |  201   |        sucesso         |
|                |  500   |          erro          |
|                |  422   | ausência de parâmetros |


#### 13. PUT ```/api/receita/{id}```
- Parêmetros

|       nome       | obrigatório |                        tipo                        |
|:----------------:|:-----------:|:--------------------------------------------------:|
|        id        | obrigatório |                   string na url                    |
|       nome       | obrigatório |                       string                       |
| tempo_de_preparo | obrigatório |                      inteiro                       |
|   estacao_ano    | obrigatório |                       string                       |
|   modo_preparo   | obrigatório |                       string                       |

- Retornos

|     dados      | status |        condição        |
|:--------------:|:------:|:----------------------:|
| objeto receita |  200   |        sucesso         |
|                |  500   |          erro          |
|                |  422   | ausência de parâmetros |
|                |  422   | receita não encontrado |


#### 14. DELETE ```/api/receita/{id}```
- Parêmetros

| nome  | obrigatório |     tipo      |
|:-----:|:-----------:|:-------------:|
|  id   | obrigatório | string na url |

- Retornos

|     dados      | status |        condição        |
|:--------------:|:------:|:----------------------:|
| objeto receita |  200   |        sucesso         |
|                |  500   |          erro          |
|                |  422   | receita não encontrada |
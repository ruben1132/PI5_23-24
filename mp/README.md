### How to boot
```bash
swipl
```

<br /> 

### Run the find path algorithm
```bash
['caminhos'].
```
some examples
```bash
find_caminho_entidades(astar,sala(apn),elev(c1),Cam, Mov, Custo).
```
```bash
find_caminho_entidades(astar,sala(apn),sala(beng),Cam, Mov, Custo).
```

<br /> 

### Run the genetic algorithm and the generate all sequences algorithm
```bash
['algGenetico'].
```
first generate the dynamic base knowledge
```bash
gera_transicoes.
```

<br /> 

genetic algorithm
```bash
gera.
```

<br /> 

all sequences
```bash
gera_permutacoes(A).
```

<br /> 

### How to start the http server

```bash
['server'].
```
```bash
startServer(5000).
```


**endpoints (eg.):**
- **[GET]** find paths between 2 given points 
```json
localhost:5000/findPath?algorithm=astar&origin=sala(apn)&destiny=elev(c1)
```

<br /> 

**[POST]** generate a task planning for a given list of tasks 
<sup>(this endpoint is not finished.)</sup>

```json
localhost:5000/planning

{
    "tasks": [
        {
            "taskId": "n483fnf43f43f9f",
            "origin": "sala(apn)",
            "destiny": "elev(c1)"
        },
        {
            "taskId": "mmzxxiz0",
            "origin": "sala(b202)",
            "destiny": "pass(b2,c2)"
        }
    ],
    "algorithm": "ag"   // it can be "ag" or "seq"
}
```



### Generate the Floor Maps knowledge base
In case you want to change the floor maps, all you need to do is to open the genFloorMapsBC.js file and change the arrays in there and then run the file with node.


	## Contents
_ [Views](#views)
	_ [Introduction](#introduction)
	_ [Nível 1](#nível_1)
		_ [Vista Lógica](#vista_lógica)
		_ [Vista de Processos](#vista_de_processos)
			_ [SSD US1](#ssd_us1)
			_ [SSD US2](#ssd_us2)
			_ [(outros SSD arquiteturalmente relevantes)](#outros_ssd_arquiteturalmente_relevantes)
	_ [Nível 2](#nível_2)
		_ [Vista Lógica](#vista_lógica_1)
		_ [Vista de Processos](#vista_de_processos_1)
			_ [SSD US13 (Porquê esta US?)](#ssd_us13_porquê_esta_us)
			_ [(outros SSD arquiteturalmente relevantes)](#outros_ssd_arquiteturalmente_relevantes_1)
		_ [Vista de Implementação](#vista_de_implementação)
		_ [Vista Física](#vista_física)
	_ [Nível 3 (GestaoInfo)](#nível_3_planeamento)
		_ [Vista Lógica](#vista_lógica_5)
		_ [Vista de Processos](#vista_de_processos_5)
		_ [Vista de Implementação](#vista_de_implementação_4)
		_ [Vista Física](#vista_física_4)

# Views

## Introduction
Será adotada a combinação de dois modelos de representação arquitetural: C4 e 4+1.

O Modelo de Vistas 4+1 [[Krutchen_1995]](References.md#Kruchten_1995) propõe a descrição do sistema através de vistas complementares permitindo assim analisar separadamente os requisitos dos vários stakeholders do software, tais como utilizadores, administradores de sistemas, project managers, arquitetos e programadores. As vistas são deste modo definidas da seguinte forma:

_ Vista lógica: relativa aos aspetos do software visando responder aos desafios do negócio;
_ Vista de processos: relativa ao fluxo de processos ou interações no sistema;
_ Vista de desenvolvimento: relativa à organização do software no seu ambiente de desenvolvimento;
_ Vista física: relativa ao mapeamento dos vários componentes do software em hardware, i.e. onde é executado o software;
_ Vista de cenários: relativa à associação de processos de negócio com atores capazes de os espoletar.

O Modelo C4 [[Brown_2020]](References.md#Brown_2020)[[C4_2020]](References.md#C4_2020) defende a descrição do software através de quatro níveis de abstração: sistema, contentor, componente e código. Cada nível adota uma granularidade mais fina que o nível que o antecede, dando assim acesso a mais detalhe de uma parte mais pequena do sistema. Estes níveis podem ser equiparáveis a mapas, e.g. a vista de sistema corresponde ao globo, a vista de contentor corresponde ao mapa de cada continente, a vista de componentes ao mapa de cada país e a vista de código ao mapa de estradas e bairros de cada cidade.
Diferentes níveis permitem contar histórias diferentes a audiências distintas.

Os níveis encontram_se definidos da seguinte forma:
_ Nível 1: Descrição (enquadramento) do sistema como um todo;
_ Nível 2: Descrição de contentores do sistema;
_ Nível 3: Descrição de componentes dos contentores;
_ Nível 4: Descrição do código ou partes mais pequenas dos componentes (e como tal, não será abordado neste DAS/SAD).

Pode_se dizer que estes dois modelos se expandem ao longo de eixos distintos, sendo que o Modelo C4 apresenta o sistema com diferentes níveis de detalhe e o Modelo de Vista 4+1 apresenta o sistema de diferentes perspetivas. Ao combinar os dois modelos torna_se possível representar o sistema de diversas perspetivas, cada uma com vários níveis de detalhe.

Para modelar/representar visualmente, tanto o que foi implementado como as ideias e alternativas consideradas, recorre_se à Unified Modeling Language (UML) [[UML_2020]](References.md#UML_2020) [[UMLDiagrams_2020]](References.md#UMLDiagrams_2020).

## Nível 1
### Vista Lógica

![N1_VL](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_VL.svg)

### Vista de Processos
#### SSD US150
![N1_VP_US150](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US150.svg)

#### SSD US160
![N1_VP_US160](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US160.svg)

#### SSD US170
![N1_VP_US170](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US170.svg)

#### SSD US180
![N1_VP_US180](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US180.svg)

#### SSD US190
![N1_VP_US190](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US190.svg)

#### SSD US200
![N1_VP_US200](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US200.svg)

#### SSD US210
![N1_VP_US210](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US210.svg)

#### SSD US220
![N1_VP_US220](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US220.svg)

#### SSD US230
![N1_VP_US230](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US230.svg)

#### SSD US240
![N1_VP_US240](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US240.svg)

#### SSD US250
![N1_VP_US250](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US250.svg)

#### SSD US260
![N1_VP_US260](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US260.svg)

#### SSD US270
![N1_VP_US270](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US270.svg)

#### SSD US310
![N1_VP_US310](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US310.svg)

#### SSD US350
![N1_VP_US350](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US350.svg)

#### SSD US360
![N1_VP_US360](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US360.svg)

#### SSD US370
![N1_VP_US370](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel1/N1_US370.svg)


## Nível 2
### Vista Lógica

![N2_VL](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_VL.svg)

### Vista de Processos

#### SSD US150
![N2_VP_US150](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US150.svg)

#### SSD US160
![N2_VP_US160](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US160.svg)

#### SSD US170
![N2_VP_US170](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US170.svg)

#### SSD US180
![N2_VP_US180](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US180.svg)

#### SSD US190
![N2_VP_US190](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US190.svg)

#### SSD US200
![N2_VP_US200](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US200.svg)

#### SSD US210
![N2_VP_US210](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US210.svg)

#### SSD US220
![N2_VP_US220](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US220.svg)

#### SSD US230
![N2_VP_US230](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US230.svg)

#### SSD US240
![N2_VP_US240](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US240.svg)

#### SSD US250
![N2_VP_US250](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US250.svg)

#### SSD US260
![N2_VP_US260](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US260.svg)

#### SSD US270
![N2_VP_US270](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US270.svg)

#### SSD US310
![N2_VP_US310](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US310.svg)

#### SSD US350
![N2_VP_US350](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US350.svg)

#### SSD US360
![N2_VP_US360](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US360.svg)

#### SSD US370
![N2_VP_US370](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_US370.svg)


### Vista de Implementação
![N2_VL](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_VI.svg)

### Vista Física

![N2_VL](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel2/N2_VF.svg)

## Nível 3 (GestaoInfo)
### Vista Lógica
TBD

### Vista de Processos
#### SSD US150
![N3_VP_US150](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US150.svg)

#### SSD US160
![N3_VP_US160](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US160.svg)

#### SSD US170
![N3_VP_US170](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US170.svg)

#### SSD US180
![N3_VP_US180](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US180.svg)

#### SSD US190
![N3_VP_US190](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US190.svg)

#### SSD US200
![N3_VP_US200](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US200.svg)

#### SSD US210
![N3_VP_US210](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US210.svg)

#### SSD US220
![N3_VP_US220](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US220.svg)

#### SSD US230
![N3_VP_US230](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US230.svg)

#### SSD US240
![N3_VP_US240](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US240.svg)

#### SSD US250
![N3_VP_US250](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US250.svg)

#### SSD US260
![N3_VP_US260](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US260.svg)

#### SSD US270
![N3_VP_US270](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US270.svg)

#### SSD US310
![N3_VP_US310](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US310.svg)

#### SSD US350
![N3_VP_US350](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US350.svg)

#### SSD US360
![N3_VP_US360](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US360.svg)

#### SSD US370
![N3_VP_US370](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_US370.svg)


### Vista de Implementação
![N3_VL](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_VI.svg)

### Vista Física

![N3_VL](https://github.com/ruben1132/PI5_23-24/blob/main/docs/Nivel3/N3_VF.svg)

% ALGORITMOS PARA ENCONTRAR OS CAMINHOS ENTRE EDIFICIOS E PISOS


:- consult('campusBC.pl').          % campusBC.pl - edificios, elevadores, salas, passagens
:- consult('coordenadasBC.pl').     % coordenadasBC.pl - coordenadas dos elevadores, salas, passagens
:- consult('caminhosInternos.pl').  % algoritmo para criar o grafo e algoritmos de pesquisa


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% algoritmos %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%a encontrar um caminho entre edificios 
%?- caminho_edificios(j,a,LEdCam).
% LEdCam = [j, i, b, g, h, a] ;
% LEdCam = [j, i, h, a] ;
% false.

caminho_edificios(EdOr,EdDest,LEdCam):-caminho_edificios2(EdOr,EdDest,[EdOr],LEdCam).

caminho_edificios2(EdX,EdX,LEdInv,LEdCam):-!,reverse(LEdInv,LEdCam).
caminho_edificios2(EdAct,EdDest,LEdPassou,LEdCam):-(liga(EdAct,EdInt);liga(EdInt,EdAct)),\+member(EdInt,LEdPassou),
                                                               caminho_edificios2(EdInt,EdDest,[EdInt|LEdPassou],LEdCam).

%b encontrar todos os caminhos entre edificios 
%?- todos_caminhos_edificios(i,b,LTCamEd).
% LTCamEd = [[i, b], [i, h, g, b]].
%
%
%

todos_caminhos_edificios(EdOr,EdDest,LTCamEd):-findall(LEdCam,caminho_edificios(EdOr,EdDest,LEdCam),LTCamEd).



% c encontrar um caminho entre pisos de edificios usando passagens e
% elevadores 
%
% ?- caminho_pisos(j2,g4,LEdCam,LLig).
%LEdCam = [j, i, b, g],
% LLig = [pass(j2, i2), elev(i2, i3), pass(i3, b3), pass(b3, g3), elev(g3,g4)] ;
%LEdCam = [j, i, b, g],
% LLig = [pass(j2, i2), elev(i2, i3), pass(i3, b3), elev(b3, b2), pass(b2,g2), elev(g2, g4)] ;
%LEdCam = [j, i, b, g],
% LLig = [elev(j2, j1), pass(j1, i1), elev(i1, i3), pass(i3, b3), pass(b3,g3), elev(g3, g4)] ;
%LEdCam = [j, i, b, g],
% LLig = [elev(j2, j1), pass(j1, i1), elev(i1, i3), pass(i3, b3), elev(b3,b2), pass(b2, g2), elev(g2, g4)] ;
%LEdCam = [j, i, b, g],
% LLig = [elev(j2, j3), pass(j3, i3), pass(i3, b3), pass(b3, g3), elev(g3,g4)] ;
%LEdCam = [j, i, b, g],
% LLig = [elev(j2, j3), pass(j3, i3), pass(i3, b3), elev(b3, b2), pass(b2,g2), elev(g2, g4)] ;
%LEdCam = [j, i, h, g],
%LLig = [pass(j2, i2), pass(i2, h2), pass(h2, g2), elev(g2, g4)] ;
%LEdCam = [j, i, h, g],
% LLig = [elev(j2, j1), pass(j1, i1), elev(i1, i2), pass(i2, h2), pass(h2,g2), elev(g2, g4)] ;
%LEdCam = [j, i, h, g],
% LLig = [elev(j2, j3), pass(j3, i3), elev(i3, i2), pass(i2, h2), pass(h2,g2), elev(g2, g4)]

caminho_pisos(PisoOr,PisoDest,LEdCam,LLig):-pisos(EdOr,LPisosOr),member(PisoOr,LPisosOr),
                                 pisos(EdDest,LPisosDest),member(PisoDest,LPisosDest),
                                 caminho_edificios(EdOr,EdDest,LEdCam),
                                 segue_pisos(PisoOr,PisoDest,LEdCam,LLig).

segue_pisos(PisoDest,PisoDest,_,[]).
segue_pisos(PisoDest1,PisoDest,[EdDest],[elev(PisoDest1,PisoDest)]):-
    PisoDest\==PisoDest1,
    elevador(EdDest,LPisos), member(PisoDest1,LPisos), member(PisoDest,LPisos).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[pass(PisoAct,PisoSeg)|LOutrasLig]):-
    (passagem(EdAct,EdSeg,PisoAct,PisoSeg);passagem(EdSeg,EdAct,PisoSeg,PisoAct)),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),pass(PisoAct1,PisoSeg)|LOutrasLig]):-
    (passagem(EdAct,EdSeg,PisoAct1,PisoSeg);passagem(EdSeg,EdAct,PisoSeg,PisoAct1)),PisoAct1\==PisoAct,
    elevador(EdAct,LPisos),member(PisoAct,LPisos),member(PisoAct1,LPisos),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).



% d escolher o caminho que envolve menos utilizacoes de elevadores e em
% caso de iguadade menos utilizacao de passagens, menos trocos
%
% ?- melhor_caminho_pisos(a1,d3,L).
% L = [elev(a1, a2), pass(a2, b2), pass(b2, d3)] 
%
%

melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor):-
    findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
    menos_elevadores(LLLig,LLigMelhor,_,_).

menos_elevadores([LLig],LLig,NElev,NPass):-conta(LLig,NElev,NPass).
menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NPassR):-
    menos_elevadores(OutrosLLig,LLigM,NElev,NPass),
    conta(LLig,NElev1,NPass1),
    (((NElev1<NElev;(NElev1==NElev,NPass1<NPass)),!,NElevR is NElev1, NPassR is NPass1,LLigR=LLig);
     (NElevR is NElev,NPassR is NPass,LLigR=LLigM)).

conta([],0,0).
conta([elev(_,_)|L],NElev,NPass):-conta(L,NElevL,NPass),NElev is NElevL+1.
conta([pass(_,_)|L],NElev,NPass):-conta(L,NElev,NPassL),NPass is NPassL+1.



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% auxiliar - processos %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% processa cada piso da lista do caminho e chamar cria_grafo/3
processar_caminho([]).                                                          
processar_caminho([Elemento1, Elemento2|Resto]):-
                        processar_elementos(Elemento1, Elemento2),                          % nao processa aos pares, processa em corrente, exemplo: 1,2  2,3  3,4 
                        processar_caminho([Elemento2 | Resto]).

% tem se deslocar entre pisos apenas - se o user mandar por exemplo elev(a1), elev(a2) - nao tem de fazer nada
processar_elementos(elev(_), elev(_)).

% tem de se deslocar entre salas (pode acontecer se o user mandar 2 salas no mesmo piso)
processar_elementos(sala(SalaOrig), sala(SalaDest)) :-
                        sala(SalaOrig, Piso),                                               % obtem o piso da sala (que acaba por ser o mesmo pra ambas)
                                                                             
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),                
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY), 
                        write('Piso: '), write(Piso), nl,
                        write('Sala Origem: '), write(SalaOrig), nl,
                        write('Sala Destino: '), write(SalaDest), nl,
                        write('Coordenadas Origem: '), write(StartX), write(' '), write(StartY), nl,
                        write('Coordenadas Destino: '), write(EndX), write(' '), write(EndY), nl,
                         criar_grafos_pisos(Piso),   
                        find_caminho_robot(Piso, StartX, StartY, EndX, EndY). 

% tem de se deslocar entre uma sala e um elevador (obviamente têm de ser do mesmo piso)
processar_elementos(sala(SalaOrig), elev(Piso, _)) :-
                        criar_grafos_pisos(Piso),                                                         
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),                
                        obter_coordenadas_elev(Piso, EndX, EndY),   
                        find_caminho_robot(Piso, StartX, StartY, EndX, EndY).

% tem de se deslocar entre uma sala e uma passagem (obviamente têm de ser do mesmo piso)
processar_elementos(sala(SalaOrig), pass(Piso, _)) :-
                        criar_grafos_pisos(Piso),                                                         
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),                
                        obter_coordenadas_pass(Piso, Piso, EndX, EndY, _, _),   
                        find_caminho_robot(Piso, StartX, StartY, EndX, EndY).

% tem de se deslocar entre uma passagem e um elevador
processar_elementos(pass(PisoOrig,Piso), elev(Piso,_)) :-
                        criar_grafos_pisos(Piso),                                                         
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),                
                        obter_coordenadas_elev(Piso, EndX, EndY),   
                        find_caminho_robot(Piso, StartX, StartY, EndX, EndY).                             

% tem de se deslocar entre um elevador e uma passagem
processar_elementos(elev(_,Piso), pass(Piso,PisoDest)) :-
                        criar_grafos_pisos(Piso),                                                  
                        obter_coordenadas_elev(Piso, StartX, StartY),     
                        obter_coordenadas_pass(Piso, PisoDest, EndX, EndY, _, _),      
                        find_caminho_robot(Piso, StartX, StartY, EndX, EndY).                             

% tem de se deslocar entre uma passagem e uma passagem
processar_elementos(pass(PisoOrig, Piso), pass(Piso,PisoDest)) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),      
                        obter_coordenadas_pass(Piso, PisoDest, EndX, EndY, _, _),      
                        find_caminho_robot(Piso, StartX, StartY, EndX, EndY).                            

% tem de se deslocar entre um elevador e uma sala
processar_elementos(elev(Piso, _), sala(SalaDest)) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_elev(Piso, StartX, StartY),      
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY),      
                        find_caminho_robot(Piso, StartX, StartY, EndX, EndY).

% tem de s deslocar entre uma passagem e uma sala
processar_elementos(pass(PisoOrig, Piso), sala(SalaDest)) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),      
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY),      
                        find_caminho_robot(Piso, StartX, StartY, EndX, EndY). 

% obtem as coordenadas dos elevadores
obter_coordenadas_elev(Piso, EleV, ElevY) :-
                        coordenadas(Piso, EleV, ElevY).                                         

% obtem as coordenadas das passagens
obter_coordenadas_pass(Origem, Destino, OrigX, OrigY, DestX, DestY) :-                  
                        coordenadas(Origem, Destino, OrigX, OrigY, DestX, DestY).        % obtem as coordenadas da passagem - origem e destino

% obtem as coordenadas das salas
obter_coordenadas_sala(Piso, Sala, SalaX, SalaY) :-
                        coordenadas(Sala, Piso, SalaX, SalaY).        

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% auxiliar - interface %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% cria o grafo para um piso
criar_grafos_pisos(Piso) :-
                        dimensoes(Piso, Col, Lin),                         % obtem as dimensoes do piso
                        cria_grafo(Col, Lin, Piso).                      
                                
find_caminho_robot(Piso,StarX, StartY, EndX, EndY) :-                                
                        aStar(cel(StarX, StartY), cel(EndX, EndY), Caminho, Custo, Piso),     % chama o A*
                        write('Caminho: '), write(Caminho), nl,                         
                        write('Custo: '), write(Custo), nl.


% determinar o tipo da entidade recebida e buscar o piso
determinar_tipo_entidade(sala(Elemento), Piso) :-
                                sala(Elemento, Piso).                       % obtem o piso da sala

determinar_tipo_entidade(elev(Piso), Piso).

determinar_tipo_entidade(pass(Orig, Dest), Piso):-
                                passagem(_,_, Orig, Dest), Piso = Orig.      % obtem o piso relevante da passagem


% encontrar o melhor caminho entre os pisos
find_caminho(PisoOr, PisoDest, Caminho):-
                            melhor_caminho_pisos(PisoOr,PisoDest,Caminho).                % obter o melhor caminho entre os pisos
                         



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% INTERFACE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% %%%% meter um predicado em q chama um predicado pra criar os grafos pra todos os pisos e criar um predicado em q realmente vai ser a interface
% %%%% em q chama o predicado de criar os grafos e dps chama o find_caminho_salas (este predicado tem de ser alterado pra permitir receber 
%  sala, piso | sala, elevador | sala, passagem | etc - basicamente fazer varios predicados pra cada tipo de elemento)

% predicado para o user - encontrar caminho entre 2 pontos
find_caminho_entidades(ElementoOr, ElementoDest) :-
                     determinar_tipo_entidade(ElementoOr, PisoOr),                          % determinar o tipo e piso do elemento de origem
                     determinar_tipo_entidade(ElementoDest, PisoDest),                            
                     find_caminho(PisoOr, PisoDest, Caminho),                               % encontrar o melhor caminho entre os pisos
                     append([ElementoOr|Caminho], [ElementoDest], CaminhoCompleto),         % add o ponto de partida e o ponto de chegada à lista do caminho
                     write('Melhor Caminho: '),write(CaminhoCompleto),nl,        
                     processar_caminho(CaminhoCompleto).                                  % processa o caminho encontrado





:-dynamic ligacel/4.

% ALGORITMOS PARA ENCONTRAR OS CAMINHOS ENTRE EDIFICIOS E PISOS


:- consult('campusBC.pl').          % campusBC.pl - edificios, elevadores, salas, passagens
:- consult('coordenadasBC.pl').     % coordenadasBC.pl - coordenadas dos elevadores, salas, passagens
% :- consult('caminhosInternos.pl').  % algoritmo para criar o grafo e algoritmos de pesquisa
:- consult('floorMapsBC.pl').

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% algoritmos caminho entre pisos %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

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
todos_caminhos_edificios(EdOr,EdDest,LTCamEd):-findall(LEdCam,caminho_edificios(EdOr,EdDest,LEdCam),LTCamEd).



% c encontrar um caminho entre pisos de edificios usando passagens e
% elevadores 
%
% ?- caminho_pisos(j2,g4,LEdCam,LLig).
%LEdCam = [j, i, b, g],
% LLig = [pass(j2, i2), elev(i2, i3), pass(i3, b3), pass(b3, g3), elev(g3,g4)] ;
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




%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% criar grafo e algoritmos de pesquisa %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

cria_grafo(_,_,0):-!.

cria_grafo(Piso,Col,Lin):-
   cria_grafo_lin(Piso,Col,Lin),
   Lin1 is Lin-1,
   cria_grafo(Piso,Col,Lin1).

cria_grafo_lin(_,0,_):-!.

cria_grafo_lin(Piso,Col,Lin):- 
   m(Piso,Lin,Col,0),!,
   ColS is Col+1, ColA is Col-1, 
   LinS is Lin+1,LinA is Lin-1,
   ((m(Piso,Lin,ColS,0),assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,Lin),1));true)),
   ((m(Piso,Lin,ColA,0),assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,Lin),1));true)),
   ((m(Piso,LinS,Col,0),assertz(ligacel(Piso,cel(Col,Lin),cel(Col,LinS),1));true)),
   ((m(Piso,LinA,Col,0),assertz(ligacel(Piso,cel(Col,Lin),cel(Col,LinA),1));true)),
   ((m(Piso,LinS,ColS,0), m(Piso,LinS,Col,0), m(Piso,Lin,ColS,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,LinS),sqrt(2)));true)),
   ((m(Piso,LinA,ColA,0), m(Piso,LinA,Col,0), m(Piso,Lin,ColA,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,LinA),sqrt(2)));true)),
   ((m(Piso,LinA,ColS,0), m(Piso,LinA,Col,0), m(Piso,Lin,ColS,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,LinA),sqrt(2)));true)),
   ((m(Piso,LinS,ColA,0), m(Piso,Lin,ColA,0), m(Piso,LinS,Col,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,LinS),sqrt(2)));true)),
   Col1 is Col-1,
   cria_grafo_lin(Piso,Col1,Lin).

cria_grafo_lin(Piso,Col,Lin):-
   Col1 is Col-1,
   cria_grafo_lin(Piso,Col1,Lin).


dfs(Piso,Orig,Dest,Cam):-
   dfs2(Piso,Orig,Dest,[Orig],Cam).

dfs2(_,Dest,Dest,LA,Cam):-
   reverse(LA,Cam).

dfs2(Piso,Act,Dest,LA,Cam):-
   (ligacel(Piso,Act,X,_); ligacel(Piso,X,Act,_)), \+ member(X,LA),
   dfs2(Piso,X,Dest,[X|LA],Cam).

all_dfs(Piso,Orig,Dest,LCam):-
   findall(Cam,dfs(Piso,Orig,Dest,Cam),LCam).

better_dfs(Piso,Orig,Dest,Cam):- 
   all_dfs(Piso,Orig,Dest,LCam), shortlist(LCam,Cam,_).

shortlist([L],L,N):-!,length(L,N).

shortlist([L|LL],Lm,Nm):-
   shortlist(LL,Lm1,Nm1), length(L,NL),
   ((NL<Nm1,!,Lm=L,Nm is NL); (Lm=Lm1,Nm is Nm1)).


bfs(Piso,Orig,Dest,Cam):-bfs2(Piso,Dest,[[Orig]],Cam).

bfs2(_,Dest,[[Dest|T]|_],Cam):-
	reverse([Dest|T],Cam).

bfs2(Piso,Dest,[LA|Outros],Cam):-
	LA=[Act|_],
	findall([X|LA],
		(Dest\==Act,(ligacel(Piso,Act,X,_);ligacel(Piso,X,Act,_)),\+ member(X,LA)),
		Novos),
	append(Outros,Novos,Todos),
	bfs2(Piso,Dest,Todos,Cam).


% A STAR
% calcular a distância euclidiana entre duas células
estimativa(cel(X1, Y1), cel(X2, Y2), Distancia) :-
    Distancia is sqrt((X1 - X2)^2 + (Y1 - Y2)^2).

% predicado principal do A*
aStar(Orig, Dest, Cam, Custo, Piso) :-
    aStar2(Piso, Dest, [(_, 0, [Orig])], Cam, Custo).

% predicado auxiliar para o A*
aStar2(_, Dest, [(_, Custo, [Dest|T])|_], Cam, Custo) :-
    reverse([Dest|T], Cam).

aStar2(Piso, Dest, [(_, Ca, LA)|Outros], Cam, Custo) :-
    LA = [Act|_],
    findall((CEX, CaX, [X|LA]),
            (Dest \== Act, 
                (ligacel(Piso, Act, X,CustoX);ligacel(Piso, X, Act,CustoX)), \+ member(X, LA), 
                CaX is CustoX + Ca, estimativa(X, Dest, EstX),
            CEX is CaX + EstX), 
        Novos),
    append(Outros, Novos, Todos),
    % write('Novos='),write(Novos),nl,
    sort(Todos, TodosOrd),
    % write('TodosOrd='),write(TodosOrd),nl,
    aStar2(Piso, Dest, TodosOrd, Cam, Custo).



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% auxiliar - processar %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% processa cada piso da lista do caminho e chamar cria_grafo/3
processar_caminho(_, [], _, _) :- !.
processar_caminho(_, [_], _, _) :-!.            




processar_caminho(Algorith, [Elemento1, Elemento2 | Resto], [Cam|CamResto], CustoTot) :-!,
                            processar_elementos(Algorith, Elemento1, Elemento2, Cam, Custo),
                            CustoTotNew is CustoTot + Custo,
                            processar_caminho(Algorith, [Elemento2 | Resto], CamResto, CustoTotNew).

% tem de se deslocar entre salas (pode acontecer se o user mandar 2 salas no mesmo piso)
% (sala(Nome) so aparece na lista como primeiro e ultimo elemento, pq significa q foi o q foi introduzido pelo user) 
processar_elementos(Algorith,sala(SalaOrig), sala(SalaDest), Cam, Custo) :-
                        sala(SalaOrig, Piso),                                               % obtem o piso da sala (que acaba por ser o mesmo pra ambas)                            
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),                
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY), 
                        print_info_processar(Piso, sala(SalaOrig), sala(SalaDest), StartX, StartY, EndX, EndY),
                        criar_grafos_pisos(Piso),   
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo).
                        % write("Custo: "), write(Custo), nl,
                        % write("Caminho: "), write(Cam), nl.
                       


% tem de se deslocar entre uma sala e uma pass do mesmo piso (so acontece se o user pedir por exemplo sala(a101) elev(a1))
processar_elementos(Algorith,sala(SalaOrig), elev(Piso), Cam, Custo):-
                        criar_grafos_pisos(Piso),                                                  
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),     
                        obter_coordenadas_elev(Piso, EndX, EndY),     
                        print_info_processar(Piso, sala(SalaOrig), elev(Piso), StartX, StartY, EndX, EndY),  
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo).  


% tem de se deslocar entre uma sala e um elevador (do mesmo piso)
processar_elementos(Algorith,sala(SalaOrig), elev(Piso, PisoDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                                         
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),                
                        obter_coordenadas_elev(Piso, EndX, EndY),   
                        print_info_processar(Piso, sala(SalaOrig), elev(Piso, PisoDest), StartX, StartY, EndX, EndY),
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo).


% tem de se deslocar entre uma sala e uma passagem do mesmo piso
processar_elementos(Algorith,sala(SalaOrig), pass(Piso, PisoDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                                         
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),                
                        obter_coordenadas_pass(Piso, PisoDest, EndX, EndY, _, _),   
                        print_info_processar(Piso, sala(SalaOrig), pass(Piso, PisoDest), StartX, StartY, EndX, EndY),
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo).


% tem se deslocar entre pisos apenas - se o user mandar por exemplo elev(a1), elev(a2) - nao tem de fazer nada
processar_elementos(_,elev(_), elev(_), _, 0).


% tem de se deslocar entre um elevador e uma passagem
% (elev(Piso) so aparece na lista como primeiro e ultimo elemento, pq significa q foi o q foi introduzido pelo user) 
processar_elementos(Algorith,elev(Piso), pass(Piso, PisoDest), Cam, Custo):-
                        criar_grafos_pisos(Piso),                                                  
                        obter_coordenadas_elev(Piso, StartX, StartY),     
                        obter_coordenadas_pass(Piso, PisoDest, EndX, EndY, _, _),    
                        print_info_processar(Piso, elev(Piso), pass(Piso,PisoDest), StartX, StartY, EndX, EndY),  
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo).  


% tem de se deslocar entre um elevador e uma sala
processar_elementos(Algorith,elev(Piso), sala(SalaDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_elev(Piso, StartX, StartY),      
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY),  
                        print_info_processar(Piso, elev(Piso), sala(SalaDest), StartX, StartY, EndX, EndY),      
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo).


% tem de se deslocar entre um elevador e um elevador (acontece quando na lista aparece elev(a1) elev(a1,a2))
processar_elementos(Algorith,elev(Piso), elev(Piso, PisoDest), _, 0):-                                    
                        obter_coordenadas_elev(Piso, StartX, StartY),      
                        print_info_processar(Algorith, elev(Piso), elev(Piso, PisoDest), StartX, StartY, StartX, StartY).



% tem de se deslocar entre uma passagem e um elevador
processar_elementos(Algorith,pass(PisoOrig,Piso), elev(Piso,PisoDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                                         
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),                
                        obter_coordenadas_elev(Piso, EndX, EndY),   
                        print_info_processar(Piso, pass(PisoOrig,Piso), elev(Piso,PisoDest), StartX, StartY, EndX, EndY),
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo).                             


% tem de se deslocar entre uma passagem e uma passagem
processar_elementos(Algorith,pass(PisoOrig, Piso), pass(Piso,PisoDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),      
                        obter_coordenadas_pass(Piso, PisoDest, EndX, EndY, _, _),      
                        print_info_processar(Piso, pass(PisoOrig, Piso), pass(Piso,PisoDest), StartX, StartY, EndX, EndY),  
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo). 


% tem de se deslocar entre uma passagem e uma sala
processar_elementos(Algorith,pass(PisoOrig, Piso), sala(SalaDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),      
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY),  
                        print_info_processar(Piso, pass(PisoOrig, Piso), sala(SalaDest), StartX, StartY, EndX, EndY),         
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo). 


% tem de se deslocar entre uma passagem e um elev (acontece quando o user pede por exemplo pass(a1,a2) elev(a2))
processar_elementos(Algorith,pass(PisoOrig, Piso), elev(Piso), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),      
                        obter_coordenadas_elev(Piso, EndX, EndY),  
                        print_info_processar(Piso, pass(PisoOrig, Piso), elev(Piso), StartX, StartY, EndX, EndY),         
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo). 


% tem de se deslocar entre um elevador e uma passagem
processar_elementos(Algorith,elev(_,Piso), pass(Piso,PisoDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                                  
                        obter_coordenadas_elev(Piso, StartX, StartY),     
                        obter_coordenadas_pass(Piso, PisoDest, EndX, EndY, _, _),    
                        print_info_processar(Piso, elev(_,Piso), pass(Piso,PisoDest), StartX, StartY, EndX, EndY),  
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo).                                                        


% tem de se deslocar entre um elevador e uma sala
processar_elementos(Algorith,elev(PisoOrig, Piso), sala(SalaDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                             
                        obter_coordenadas_elev(Piso, StartX, StartY),      
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY),  
                        print_info_processar(Piso, elev(PisoOrig, Piso), sala(SalaDest), StartX, StartY, EndX, EndY),      
                        find_caminho_robot(Algorith,Piso, StartX, StartY, EndX, EndY, Cam, Custo).


% tem de se deslocar entre um elevador e um elevador (acontece quando na lista aparece por exemplo elev(a1,a2) elev(a2))
processar_elementos(_,elev(PisoOrig, Piso), elev(Piso), _, 0):-                                    
                        obter_coordenadas_elev(Piso, StartX, StartY),      
                        print_info_processar(Piso, elev(PisoOrig, Piso), elev(Piso), StartX, StartY, StartX, StartY).



% obtem as coordenadas dos elevadores
obter_coordenadas_elev(Piso, EleV, ElevY) :-
                        coordenadas(Piso, EleV, ElevY).                                         


% obtem as coordenadas das passagens
obter_coordenadas_pass(Origem, Destino, OrigX, OrigY, DestX, DestY) :-                  
                        coordenadas(Origem, Destino, OrigX, OrigY, DestX, DestY).        % obtem as coordenadas da passagem - origem e destino


% obtem as coordenadas das salas
obter_coordenadas_sala(Piso, Sala, SalaX, SalaY) :-
                        coordenadas(Sala, Piso, SalaX, SalaY).        


% print info do processar
print_info_processar(Piso, Orig, Dest, StartX, StartY, EndX, EndY).
                        % nl,
                        % nl,
                        % write('Piso: '), write(Piso), nl,
                        % write('Origem: '), write(Orig), write(" - "), 
                        % write('Destino: '), write(Dest),  nl,
                        % write('Coordenadas Origem: '), write(cel(StartX,StartY)), write(" - "),  
                        % write('Coordenadas Destino: '), write(cel(EndX,EndY)).



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% auxiliar - interface %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% cria o grafo para um piso
criar_grafos_pisos(Piso) :-
                        retractall(ligacel(Piso, _, _, _)),
                        dimensoes(Piso, Col, Lin),                         % obtem as dimensoes do piso
                        cria_grafo(Piso,Col, Lin).                      


find_caminho_robot(astar,Piso,StarX, StartY, EndX, EndY, Cam, Custo) :-   
                        aStar(cel(StarX, StartY), cel(EndX, EndY), Cam, Custo, Piso).
                        % write('Custo: '), write(Custo), nl,
                        % write('Caminho: '), write(Cam), nl.                         

find_caminho_robot(dfs,Piso,StarX, StartY, EndX, EndY, Cam, 0) :-                       
                        dfs(Piso,cel(StarX, StartY), cel(EndX, EndY), Cam).    
                        % write('Caminho: '), write(Cam), nl.   


find_caminho_robot(bdfs,Piso,StarX, StartY, EndX, EndY, Cam, 0) :-                          
                        better_dfs(Piso,cel(StarX, StartY), cel(EndX, EndY), Cam).    
                        % write('Caminho: '), write(Cam), nl.   


find_caminho_robot(bfs,Piso,StarX, StartY, EndX, EndY, Cam, 0) :-                          
                        bfs(Piso,cel(StarX, StartY), cel(EndX, EndY), Cam).    
                        % write('Caminho: '), write(Cam), nl.   


% determinar o tipo da entidade recebida e buscar o piso
determinar_tipo_entidade(sala(Elemento), Piso) :-
                                sala(Elemento, Piso).                                     % obtem o piso da sala


determinar_tipo_entidade(elev(Piso), Piso).


determinar_tipo_entidade(pass(Orig, Dest), Piso):-
                                passagem(_,_, Orig, Dest), Piso = Orig.                   % obtem o piso relevante da passagem


% encontrar o melhor caminho entre os pisos
find_caminho(PisoOr, PisoDest, Caminho):-
                            melhor_caminho_pisos(PisoOr,PisoDest,Caminho).                % obter o melhor caminho entre os pisos
                         



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% INTERFACE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% %%%% meter um predicado em q chama um predicado pra criar os grafos pra todos os pisos e criar um predicado em q realmente vai ser a interface
% %%%% em q chama o predicado de criar os grafos e dps chama o find_caminho_salas (este predicado tem de ser alterado pra permitir receber 
%  sala, piso | sala, elevador | sala, passagem | etc - basicamente fazer varios predicados pra cada tipo de elemento)

% predicado para o user - encontrar caminho entre 2 pontos
find_caminho_entidades(Algorith,ElementoOr, ElementoDest, CaminhoCompleto2, Movimentos, CustoTot) :-
                     determinar_tipo_entidade(ElementoOr, PisoOr),                                          % determinar o tipo e piso do elemento de origem
                     determinar_tipo_entidade(ElementoDest, PisoDest),                            
                     find_caminho(PisoOr, PisoDest, Caminho),                                               % encontrar o melhor caminho entre os pisos
                     append([ElementoOr|Caminho], [ElementoDest], CaminhoCompleto),                         % add o ponto de partida e o ponto de chegada à lista do caminho
                     remove_consecutive_duplicates(CaminhoCompleto, CaminhoCompleto2),                       % remove elementos consecutivos repetidos (so acontece pq...codigo batata q fiz no determinar_tipo_entidade)
                    %  write('Melhor Caminho: '),write(CaminhoCompleto2),nl,        
                     CustoTot = 0,
                     processar_caminho(Algorith,CaminhoCompleto2,Movimentos, CustoTot).                      % processa o caminho encontrado
                     %  write("Caminho total: "), write(Movimentos), nl,                                        
                     %  write('Custo Total: '), write(CustoTot), nl.                               





% Base case: an empty list has no consecutive duplicates
remove_consecutive_duplicates([], []).

% Case 1: If the list has only one element, it has no consecutive duplicates
remove_consecutive_duplicates([X], [X]).

% Case 2: If the first two elements are the same, skip the first one
remove_consecutive_duplicates([X, X | T], Result) :-
    remove_consecutive_duplicates([X | T], Result).

% Case 3: If the first two elements are different, keep the first one and recurse
remove_consecutive_duplicates([X, Y | T], [X | Result]) :-
    X \= Y,
    remove_consecutive_duplicates([Y | T], Result).

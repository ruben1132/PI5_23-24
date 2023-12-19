:-dynamic ligacel/4.
:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.

% ALGORITMOS PARA ENCONTRAR OS CAMINHOS ENTRE EDIFICIOS E PISOS


:- consult('campusBC.pl').          % campusBC.pl - edificios, elevadores, salas, passagens
:- consult('coordenadasBC.pl').     % coordenadasBC.pl - coordenadas dos elevadores, salas, passagens
% :- consult('caminhosInternos.pl').  % algoritmo para criar o grafo e algoritmos de pesquisa
:- consult('floorMapsBC.pl').
:- consult('tarefasBC.pl').

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
% caso de iguadade menos utilizacao de passagens, menos troços
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


%%%%% Similar to aStar but keeping only the most promisable partial path
bestFirst(Orig,Dest,Pat,Cost,Piso):-
    bestFirst2(Piso,Dest,(_,0,[Orig]),Pat,Cost).

bestFirst2(_,Dest,(_,Cost,[Dest|T]),Pat,Cost):-
	reverse([Dest|T],Pat).

bestFirst2(Piso,Dest,(_,Ca,LA),Pat,Cost):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
		(Dest\==Act,ligacel(Piso,Act,X,CostX),\+ member(X,LA),               % (Dest\==Act,edge(Piso,Act,X,CostX),\+ member(X,LA), unidirecional
		CaX is CostX + Ca, estimativa(X,Dest,EstX),
		CEX is CaX +EstX),New),
	sort(New,[B|_]),
	bestFirst2(Piso,Dest,B,Pat,Cost).


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

processar_caminho(Algorith, Elementos, Caminhos, TotCusto) :-
    processar_caminho_aux(Algorith, Elementos, Caminhos, 0, TotCusto).


% processar_caminho_aux(_,_, [], TotalCusto, TotalCusto).
% processar_caminho_aux(_,_, [_], TotalCusto, TotalCusto).
            
processar_caminho_aux(_,[_], [], TotalCusto, TotalCusto).


processar_caminho_aux(Algorith, [Elemento1, Elemento2 | Resto], [Cam|CamResto], PartialCusto, TotCusto) :-!,
                            processar_elementos(Algorith, Elemento1, Elemento2, Cam, Custo),
                            NovoPartialCusto is PartialCusto + Custo,
                            processar_caminho_aux(Algorith, [Elemento2 | Resto], CamResto, NovoPartialCusto, TotCusto).

% tem de se deslocar entre salas (pode acontecer se o user mandar 2 salas no mesmo piso)
% (sala(Nome) so aparece na lista como primeiro e ultimo elemento, pq significa q foi o q foi introduzido pelo user) 
processar_elementos(_,sala(SalaOrig), sala(SalaDest), Cam, Custo) :-
                        sala(SalaOrig, Piso),                                               % obtem o piso da sala (que acaba por ser o mesmo pra ambas)                            
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),                
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY), 
                        print_info_processar(Piso, sala(SalaOrig), sala(SalaDest), StartX, StartY, EndX, EndY),
                        criar_grafos_pisos(Piso),   
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, Custo).
                        % write("Custo: "), write(Custo), nl,
                        % write("Caminho: "), write(Cam), nl.
                       


% tem de se deslocar entre uma sala e uma pass do mesmo piso (so acontece se o user pedir por exemplo sala(a101) elev(a1))
processar_elementos(_,sala(SalaOrig), elev(Piso), Cam, Custo):-
                        criar_grafos_pisos(Piso),                                                  
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),     
                        obter_coordenadas_elev(Piso, EndX, EndY),     
                        print_info_processar(Piso, sala(SalaOrig), elev(Piso), StartX, StartY, EndX, EndY),  
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, C1),
                        custo(elev, C2), Custo is C1 + C2.  % soma o custo de usar um elevador


% tem de se deslocar entre uma sala e um elevador (do mesmo piso)
processar_elementos(_,sala(SalaOrig), elev(Piso, PisoDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                                         
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),                
                        obter_coordenadas_elev(Piso, EndX, EndY),   
                        print_info_processar(Piso, sala(SalaOrig), elev(Piso, PisoDest), StartX, StartY, EndX, EndY),
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, C1),
                        custo(elev, C2), Custo is C1 + C2.  % soma o custo de usar um elevador


% tem de se deslocar entre uma sala e uma passagem do mesmo piso
processar_elementos(_,sala(SalaOrig), pass(Piso, PisoDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                                         
                        obter_coordenadas_sala(Piso, SalaOrig, StartX, StartY),                
                        obter_coordenadas_pass(Piso, PisoDest, EndX, EndY, _, _),   
                        print_info_processar(Piso, sala(SalaOrig), pass(Piso, PisoDest), StartX, StartY, EndX, EndY),
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, C1),
                        custo(pass, C2), Custo is C1 + C2.  % soma o custo de usar uma passagem


% tem se deslocar entre pisos apenas - se o user mandar por exemplo elev(a1), elev(a2) - nao tem de fazer nada
processar_elementos(_,elev(_), elev(_), _, Custo):- custo(pass, Custo).


% tem de se deslocar entre um elevador e uma passagem
% (elev(Piso) so aparece na lista como primeiro e ultimo elemento, pq significa q foi o q foi introduzido pelo user) 
processar_elementos(_,elev(Piso), pass(Piso, PisoDest), Cam, Custo):-
                        criar_grafos_pisos(Piso),                                                  
                        obter_coordenadas_elev(Piso, StartX, StartY),     
                        obter_coordenadas_pass(Piso, PisoDest, EndX, EndY, _, _),    
                        print_info_processar(Piso, elev(Piso), pass(Piso,PisoDest), StartX, StartY, EndX, EndY),  
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, C1),  
                        custo(pass, C2), Custo is C1 + C2.  % soma o custo de usar uma passagem

% tem de se deslocar entre um elevador e uma sala
processar_elementos(_,elev(Piso), sala(SalaDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_elev(Piso, StartX, StartY),      
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY),  
                        print_info_processar(Piso, elev(Piso), sala(SalaDest), StartX, StartY, EndX, EndY),      
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, Custo).


% tem de se deslocar entre um elevador e um elevador (acontece quando na lista aparece elev(a1) elev(a1,a2))
processar_elementos(_,elev(Piso), elev(Piso, PisoDest), _, Custo):-                                    
                        obter_coordenadas_elev(Piso, StartX, StartY),
                        custo(elev, Custo),    
                        print_info_processar(astar, elev(Piso), elev(Piso, PisoDest), StartX, StartY, StartX, StartY).



% tem de se deslocar entre uma passagem e um elevador
processar_elementos(_,pass(PisoOrig,Piso), elev(Piso,PisoDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                                         
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),                
                        obter_coordenadas_elev(Piso, EndX, EndY),   
                        print_info_processar(Piso, pass(PisoOrig,Piso), elev(Piso,PisoDest), StartX, StartY, EndX, EndY),
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, C1),
                        custo(elev, C2), Custo is C1 + C2.                               


% tem de se deslocar entre uma passagem e uma passagem
processar_elementos(_,pass(PisoOrig, Piso), pass(Piso,PisoDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),      
                        obter_coordenadas_pass(Piso, PisoDest, EndX, EndY, _, _),      
                        print_info_processar(Piso, pass(PisoOrig, Piso), pass(Piso,PisoDest), StartX, StartY, EndX, EndY),  
                        find_caminho_robot(dfs,Piso, StartX, StartY, EndX, EndY, Cam, C1),
                        custo(pass, C2), Custo is C1 + C2.   


% tem de se deslocar entre uma passagem e uma sala
processar_elementos(_,pass(PisoOrig, Piso), sala(SalaDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),      
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY),  
                        print_info_processar(Piso, pass(PisoOrig, Piso), sala(SalaDest), StartX, StartY, EndX, EndY),         
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, Custo). 


% tem de se deslocar entre uma passagem e um elev (acontece quando o user pede por exemplo pass(a1,a2) elev(a2))
processar_elementos(_,pass(PisoOrig, Piso), elev(Piso), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                       
                        obter_coordenadas_pass(PisoOrig, Piso, _, _, StartX, StartY),      
                        obter_coordenadas_elev(Piso, EndX, EndY),  
                        print_info_processar(Piso, pass(PisoOrig, Piso), elev(Piso), StartX, StartY, EndX, EndY),         
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, C1),
                        custo(pass, C2), Custo is C1 + C2.   


% tem de se deslocar entre um elevador e uma passagem
processar_elementos(_,elev(_,Piso), pass(Piso,PisoDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                                  
                        obter_coordenadas_elev(Piso, StartX, StartY),     
                        obter_coordenadas_pass(Piso, PisoDest, EndX, EndY, _, _),    
                        print_info_processar(Piso, elev(_,Piso), pass(Piso,PisoDest), StartX, StartY, EndX, EndY),  
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, C1),
                        custo(pass, C2), Custo is C1 + C2.                                                          


% tem de se deslocar entre um elevador e uma sala
processar_elementos(_,elev(PisoOrig, Piso), sala(SalaDest), Cam, Custo) :-
                        criar_grafos_pisos(Piso),                                             
                        obter_coordenadas_elev(Piso, StartX, StartY),      
                        obter_coordenadas_sala(Piso, SalaDest, EndX, EndY),  
                        print_info_processar(Piso, elev(PisoOrig, Piso), sala(SalaDest), StartX, StartY, EndX, EndY),      
                        find_caminho_robot(astar,Piso, StartX, StartY, EndX, EndY, Cam, Custo).


% tem de se deslocar entre um elevador e um elevador (acontece quando na lista aparece por exemplo elev(a1,a2) elev(a2))
processar_elementos(_,elev(PisoOrig, Piso), elev(Piso), _, Custo):-                                    
                        obter_coordenadas_elev(Piso, StartX, StartY),      
                        custo(elev, Custo),  
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
print_info_processar(_, _, _, _, _, _, _).
                        % nl,
                        % nl,
                        % write('Piso: '), write(Piso), nl,
                        % write('Origem: '), write(A), write(" - "), 
                        % write('Destino: '), write(B),  nl.
                        % write('Coordenadas Origem: '), write(cel(StartX,StartY)), write(" - "),  
                        % write('Coordenadas Destino: '), write(cel(EndX,EndY)).



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% auxiliar - interface %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% cria o grafo para um piso
criar_grafos_pisos(Piso) :-
                        retractall(ligacel(Piso, _, _, _)),
                        dimensoes(Piso, Col, Lin),                         % obtem as dimensoes do piso
                        cria_grafo(Piso,Col, Lin).                      


find_caminho_robot(bestFirst,Piso,StarX, StartY, EndX, EndY, Cam, Custo) :-   
                        % write('StarX: '), write(StarX), nl,
                        bestFirst(cel(StarX, StartY), cel(EndX, EndY), Cam, Custo, Piso).
                        % write('Custo: '), write(Custo), nl,
                        % write('Caminho: '), write(Cam), nl.    
                                             
find_caminho_robot(astar,Piso,StarX, StartY, EndX, EndY, Cam, Custo) :-   
                        % write('StarX: '), write(StarX), nl,
                        aStar(cel(StarX, StartY), cel(EndX, EndY), Cam, Custo, Piso).
                        % write('Custo: '), write(Custo), nl,
                        % write('Caminho: '), write(Cam), nl.                         

find_caminho_robot(dfs,Piso,StarX, StartY, EndX, EndY, Cam, 0) :-    
                        % write('ffff'),nl,                   
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
                    %  CustoTot = 0,
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



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% algoritmos gen %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% tarefa(Id,TempoProcessamento,TempConclusao,PesoPenalizacao).
% tarefa(t1,2,5,1).
% tarefa(t2,4,7,6).
% tarefa(t3,1,11,2).
% tarefa(t4,3,9,3).
% tarefa(t5,3,8,2).

% tarefas(NTarefas).
tarefas(5).

% parameteriza��o
inicializa:-write('Numero de novas Geracoes: '),read(NG), (retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).


gera:-
	inicializa,
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd).

gera_populacao(Pop):-
	populacao(TamPop),
	tarefas(NumT),
	findall(Tarefa,tarefa(Tarefa,_,_,_),ListaTarefas),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	avalia(Seq,0,V).

avalia([],_,0).
avalia([T|Resto],Inst,V):-
	tarefa(T,Dur,Prazo,Pen),
	InstFim is Inst+Dur,
	avalia(Resto,InstFim,VResto),
	(
		(InstFim =< Prazo,!, VT is 0)
  ;
		(VT is (InstFim-Prazo)*Pen)
	),
	V is VT+VResto.

ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


gera_geracao(G,G,Pop):-!,
	write('Gera��o '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(N,G,Pop):-
	write('Gera��o '), write(N), write(':'), nl, write(Pop), nl,
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	N1 is N+1,
	gera_geracao(N1,G,NPopOrd).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	tarefas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% predicados auxiliares à interface %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% principal
calc(List, Eval):-
   calc_helper(List, 0, Eval).

calc_helper([_], Total, Total).

calc_helper([T1, T2 | Res], Acc, Eval):-
   tarefa(T1, Orig1, Dest1),
   tarefa(T2, Orig2, Dest2),
   find_caminho_entidades(astar, Dest1, Orig2, _, _, Eval1),
   NewAcc is Acc + Eval1,
%    write(Eval1),nl,
   calc_helper([T2 | Res], NewAcc, Eval).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% INTERFACE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Define a predicate to process the tasks
process_tasks([], _, Result) :-
    % Handle the case when there are no tasks
    Result = json{message: "No tasks provided"}.

process_tasks(Tasks, Algorithm, Result) :-
    % Process each task in the array (you can implement your logic here)
    process_each_task(Tasks, Algorithm, Result).

process_each_task([], _, []).

process_each_task([Task|Rest], Algorithm, [TaskResult|RestResult]) :-
    % Process individual task (you can implement your logic here)
    process_task(Task, Algorithm, TaskResult),
    
    % Recursive call for the remaining tasks
    process_each_task(Rest, Algorithm, RestResult).

% Define a predicate to process an individual task
process_task(Task, Algorithm, TaskResult) :-
    % Implement your logic to process each task here
    % For example, you can access Task.taskId, Task.origin, Task.destiny, etc.
    % and apply your planning algorithm
    
    % Dummy example: Just echoing the task for now
    TaskResult = Task.














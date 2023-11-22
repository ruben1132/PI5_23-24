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



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% auxiliar %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% processa cada piso da lista do caminho e chamar cria_grafo/3
processar_caminho([]).                                                          
processar_caminho([Elemento|Resto]):-
                        processa_rotas(Elemento),                       
                        processar_caminho(Resto).                       % chama recursivamente o resto da lista


% processa as rotas que o robo vai ter de fazer - elemento é um elevador
processa_rotas(elev(Origem, Destino)) :-
                        criar_grafos_pisos(Origem, Destino),                                        % cria os grafos dos pisos de origem e destino
                        obter_coordenadas_elev(Origem, Destino, OrigX, OrigY, DestX, DestY),        % obtem as coordenadas
                        find_caminho_robot(OrigX, OrigY, DestX, DestY).                             % encontra o caminho

% elemento é uma passagem
processa_rotas(pass(Origem, Destino)) :-
                        criar_grafos_pisos(Origem, Destino),                                        % cria os grafos dos pisos de origem e destino
                        obter_coordenadas_pass(Origem, Destino, OrigX, OrigY, DestX, DestY),        % obtem as coordenadas
                        find_caminho_robot(OrigX, OrigY, DestX, DestY).                             % encontra o caminho


% obtem as coordenadas dos elevadores
obter_coordenadas_elev(Origem, Destino, OrigX, OrigY, DestX, DestY) :-
                        coordenadas(Origem, OrigX, OrigY),                               % obtem as coordenadas do elevador origem  
                        coordenadas(Destino, DestX, DestY).             

% obtem as coordenadas das passagens
obter_coordenadas_pass(Origem, Destino, OrigX, OrigY, DestX, DestY) :-                  
                        coordenadas(Origem, Destino, OrigX, OrigY, DestX, DestY).        % obtem as coordenadas da passagem - origem e destino


% cria os grafos dos pisos de origem e destino
criar_grafos_pisos(Origem, Destino) :-
                        dimensoes(Origem, ColOrigem, LinOrigem),                         % obtem as dimensoes do piso
                        cria_grafo(ColOrigem, LinOrigem, Origem),                        % chama o cria_grafo/3 para o piso de origem
                        dimensoes(Destino, ColDestino, LinDestino),      
                        cria_grafo(ColDestino, LinDestino, Destino).    
                                
find_caminho_robot(OrigX, OrigY, DestX, DestY) :-                                
                        aStar(cel(OrigX, OrigY), cel(DestX, DestY), Caminho, Custo),     % chama o A* para encontrar 
                        write('Caminho: '), write(Caminho), nl,                         
                        write('Custo: '), write(Custo), nl.
                        % write('OrigX: '), write(OrigX), nl,                         
                        % write('OrigY: '), write(OrigY), nl,
                        % write('DestX: '), write(DestX), nl,                         
                        % write('DestY: '), write(DestY), nl.



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% INTERFACE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% predicado para o user - encontrar caminho entre 2 salas
find_caminho_salas(SalaOr, SalaDest):-
                                sala(SalaOr, PisoOr), sala(SalaDest, PisoDest),           % obter os pisos das salas
                                find_caminho(PisoOr, PisoDest).                           % encontrar o melhor caminho

% predicado para o user (integração do algoritmo do mlhr caminho e do algoritmo do robot)
find_caminho(PisoOr, PisoDest):-
                            melhor_caminho_pisos(PisoOr,PisoDest,Caminho),                % obter o melhor caminho entre os pisos
                            write('Melhor Caminho: '),write(Caminho),nl,        
                            processar_caminho(Caminho).                                   % chama recursivamente para processar o resto da lista



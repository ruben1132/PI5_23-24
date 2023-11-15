% ALGORITMOS PARA ENCONTRAR OS CAMINHOS ENTRE EDIFICIOS E PISOS

liga(a,h).
liga(b,g).
liga(b,i).
liga(g,h).
liga(h,i).
liga(i,j).

pisos(a,[a1]).
pisos(b,[b1,b2,b3,b4]).
pisos(g,[g2,g3,g4]).
pisos(h,[h1,h2,h3,h4]).
pisos(i,[i1,i2,i3,i4]).
pisos(j,[j1,j2,j3,j4]).

elevador(b,[b1,b2,b3,b4]).
elevador(g,[g2,g3,g4]).
elevador(i,[i1,i2,i3,i4]).
elevador(j,[j1,j2,j3,j4]).

sala(a101, a, a1).
sala(b101, b, b1).
sala(b202, b, b2).
sala(b303, b, b3).
sala(b404, b, b4).

passagem(a,h,a1,h2).
passagem(b,g,b2,g2).
passagem(b,g,b3,g3).
passagem(b,i,b3,i3).
passagem(g,h,g2,h2).
passagem(g,h,g3,h3).
passagem(h,i,h2,i2).
passagem(i,j,i1,j1).
passagem(i,j,i2,j2).
passagem(i,j,i3,j3).

% coordenadas das salas
coordenadas_sala(a101, a1, (4, 0)).
coordenadas_sala(b101, b1, (0, 4)).
coordenadas_sala(b202, b2, (8, 0)).
coordenadas_sala(b303, b3, (0, 8)).
coordenadas_sala(b404, b4, (12, 0)).

% coordenadas dos elevadores
coordenadas_elevador(b1, (1, 1)).
coordenadas_elevador(b2, (1, 1)).
coordenadas_elevador(b3, (1, 1)).
coordenadas_elevador(b4, (1, 1)).
coordenadas_elevador(g2, (2, 2)).
coordenadas_elevador(g3, (2, 2)).
coordenadas_elevador(g4, (2, 2)).
coordenadas_elevador(i1, (1, 1)).
coordenadas_elevador(i2, (1, 1)).
coordenadas_elevador(i3, (1, 1)).
coordenadas_elevador(i4, (1, 1)).
coordenadas_elevador(j1, (2, 2)).
coordenadas_elevador(j2, (2, 2)).
coordenadas_elevador(j3, (2, 2)).
coordenadas_elevador(j4, (2, 2)).

% Coordenadas das passagens
coordenadas_passagem(a,h,a1,h2, (23, 11), (11, 23)).
coordenadas_passagem(b,g,b2,g2, (23, 11), (11, 23)).
coordenadas_passagem(b,g,b3,g3, (23, 11), (11, 23)).
coordenadas_passagem(b,i,b3,i3, (23, 11), (11, 23)).
coordenadas_passagem(g,h,g2,h2, (23, 11), (11, 23)).
coordenadas_passagem(g,h,g3,h3, (23, 11), (11, 23)).
coordenadas_passagem(h,i,h2,i2, (23, 11), (11, 23)).
coordenadas_passagem(i,j,i1,j1, (23, 11), (11, 23)).
coordenadas_passagem(i,j,i2,j2, (23, 11), (11, 23)).
coordenadas_passagem(i,j,i3,j3, (23, 11), (11, 23)).


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






% c encontrar um caminho entre pisos de edificios usando passagemes e
% elevadores 
%
% ?- caminho_pisos(j2,g4,LEdCam,LLig).
%LEdCam = [j, i, b, g],
% LLig = [cor(j2, i2), elev(i2, i3), cor(i3, b3), cor(b3, g3), elev(g3,g4)] ;
%LEdCam = [j, i, b, g],
% LLig = [cor(j2, i2), elev(i2, i3), cor(i3, b3), elev(b3, b2), cor(b2,g2), elev(g2, g4)] ;
%LEdCam = [j, i, b, g],
% LLig = [elev(j2, j1), cor(j1, i1), elev(i1, i3), cor(i3, b3), cor(b3,g3), elev(g3, g4)] ;
%LEdCam = [j, i, b, g],
% LLig = [elev(j2, j1), cor(j1, i1), elev(i1, i3), cor(i3, b3), elev(b3,b2), cor(b2, g2), elev(g2, g4)] ;
%LEdCam = [j, i, b, g],
% LLig = [elev(j2, j3), cor(j3, i3), cor(i3, b3), cor(b3, g3), elev(g3,g4)] ;
%LEdCam = [j, i, b, g],
% LLig = [elev(j2, j3), cor(j3, i3), cor(i3, b3), elev(b3, b2), cor(b2,g2), elev(g2, g4)] ;
%LEdCam = [j, i, h, g],
%LLig = [cor(j2, i2), cor(i2, h2), cor(h2, g2), elev(g2, g4)] ;
%LEdCam = [j, i, h, g],
% LLig = [elev(j2, j1), cor(j1, i1), elev(i1, i2), cor(i2, h2), cor(h2,g2), elev(g2, g4)] ;
%LEdCam = [j, i, h, g],
% LLig = [elev(j2, j3), cor(j3, i3), elev(i3, i2), cor(i2, h2), cor(h2,g2), elev(g2, g4)]


caminho_pisos(PisoOr,PisoDest,LEdCam,LLig):-pisos(EdOr,LPisosOr),member(PisoOr,LPisosOr),
                                 pisos(EdDest,LPisosDest),member(PisoDest,LPisosDest),
                                 caminho_edificios(EdOr,EdDest,LEdCam),
                                 segue_pisos(PisoOr,PisoDest,LEdCam,LLig).

segue_pisos(PisoDest,PisoDest,_,[]).
segue_pisos(PisoDest1,PisoDest,[EdDest],[elev(PisoDest1,PisoDest)]):-
    PisoDest\==PisoDest1,
    elevador(EdDest,LPisos), member(PisoDest1,LPisos), member(PisoDest,LPisos).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[cor(PisoAct,PisoSeg)|LOutrasLig]):-
    (passagem(EdAct,EdSeg,PisoAct,PisoSeg);passagem(EdSeg,EdAct,PisoSeg,PisoAct)),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),cor(PisoAct1,PisoSeg)|LOutrasLig]):-
    (passagem(EdAct,EdSeg,PisoAct1,PisoSeg);passagem(EdSeg,EdAct,PisoSeg,PisoAct1)),PisoAct1\==PisoAct,
    elevador(EdAct,LPisos),member(PisoAct,LPisos),member(PisoAct1,LPisos),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).


% d escolher o caminho que envolve menos utilizacoes de elevadores e em
% caso de iguadade menos utilizacao de passagemes, menos trocos
%
% ?- melhor_caminho_pisos(j2,g4,LLigMelhor).
% LLigMelhor = [cor(j2, i2), cor(i2, h2), cor(h2, g2), elev(g2, g4)].
%
%

melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor):-
    findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
    menos_elevadores(LLLig,LLigMelhor,_,_).

menos_elevadores([LLig],LLig,NElev,NCor):-conta(LLig,NElev,NCor).
menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
    menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
    conta(LLig,NElev1,NCor1),
    (((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
     (NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

conta([],0,0).
conta([elev(_,_)|L],NElev,NCor):-conta(L,NElevL,NCor),NElev is NElevL+1.
conta([cor(_,_)|L],NElev,NCor):-conta(L,NElev,NCorL),NCor is NCorL+1.


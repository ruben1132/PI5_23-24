% ALGORITMOS PARA ENCONTRAR OS CAMINHOS ENTRE EDIFICIOS E PISOS

liga(a,b).
liga(b,c).
liga(b,d).
liga(c,d).

pisos(a,[a1,a2]).
pisos(b,[b1,b2,b3]).
pisos(c,[c1,c2,c3,c4]).
pisos(d,[d1,d2,d3]).

elevador(a,[a1,a2]).
elevador(b,[b1,b2,b3]).
elevador(c,[c1,c2,c3,c4]).
elevador(d,[d1,d2,d3]).

sala(a101, a, a1).
sala(b101, b, b1).
sala(b202, b, b2).
sala(b303, b, b3).
sala(b404, b, b4).

passagem(a,b,a2,b2).
passagem(b,c,b2,c3).
passagem(b,d,b2,d3).
passagem(b,c,b3,c4).
passagem(c,d,c2,d2).
passagem(c,d,c3,d3).

% coordenadas das salas
% Coordenadas Salas Edificio A - Piso 1
coordenadas(apn, a1, 10, 5).
coordenadas(beng, a1, 12, 2).
coordenadas(k1, a1, 16, 2).
coordenadas(k2, a1, 19, 2).
coordenadas(r1, a1, 12, 8).
coordenadas(r2, a1, 20, 8).

% Coordenadas Salas Edificio A - Piso 2
coordenadas(a201, a2, 3, 5).
coordenadas(a202, a2, 5, 6).
coordenadas(a203, a2, 5, 3).
coordenadas(a204, a2, 8, 6).
coordenadas(a205, a2, 7, 3).
coordenadas(a206, a2, 12, 6).
coordenadas(a207, a2, 10, 3).
coordenadas(a207b, a2, 16, 8).
coordenadas(a209, a2, 13, 2).

% Coordenadas Salas Edificio B - Piso 1
coordenadas(b101, b1, 2, 4).
coordenadas(b102, b1, 2, 6).
coordenadas(b103, b1, 5, 4).
coordenadas(b104, b1, 6, 8).
coordenadas(b105, b1, 13, 4).
coordenadas(b106, b1, 16, 6).
coordenadas(b107, b1, 19, 4).
coordenadas(b108, b1, 19, 8).

% Coordenadas Salas Edificio B - Piso 2
coordenadas(b201, b2, 1, 3).
coordenadas(b202, b2, 12, 3).
coordenadas(b203, b2, 5, 6).
coordenadas(b205, b2, 19, 6).
coordenadas(b207, b2, 20, 3).

% Coordenadas Salas Edificio B - Piso 3
coordenadas(b301, b3, 3, 2).
coordenadas(b302, b3, 12, 8).
coordenadas(b303, b3, 5, 2).
coordenadas(b305, b3, 10, 2).

% Coordenadas Salas Edificio C - Piso 1
coordenadas(c101, c1, 5, 2).
coordenadas(c103, c1, 5, 5).
coordenadas(c105, c1, 5, 18).
coordenadas(c102, c1, 8, 2).
coordenadas(c104, c1, 8, 6).
coordenadas(c106, c1, 8, 10).
coordenadas(c108, c1, 8, 14).
coordenadas(c110, c1, 8, 18).

% Coordenadas Salas Edificio C - Piso 2
coordenadas(c201, c2, 4, 2).
coordenadas(c202, c2, 7, 4).
coordenadas(c203, c2, 4, 5).
coordenadas(c204, c2, 7, 14).
coordenadas(c205, c2, 9, 10).
coordenadas(c206, c2, 9, 12).
coordenadas(c207, c2, 4, 11).
coordenadas(c209, c2, 3, 16).

% Coordenadas Salas Edificio C - Piso 3
coordenadas(c301, c3, 5, 6).
coordenadas(c302, c3, 6, 3).
coordenadas(c303, c3, 5, 16).
coordenadas(c304, c3, 8, 5).
coordenadas(c305, c3, 3, 16).
coordenadas(c306, c3, 11, 9).
coordenadas(c308, c3, 11, 13).
coordenadas(c310, c3, 9, 16).

% Coordenadas Salas Edificio C - Piso 4
coordenadas(c401, c4, 6, 6).
coordenadas(c402, c4, 11, 5).
coordenadas(c403, c4, 6, 14).
coordenadas(c404, c4, 11, 11).

% Coordenadas Salas Edificio D - Piso 1
coordenadas(d101, d1, 2, 6).
coordenadas(d103, d1, 4, 10).
coordenadas(d105, d1, 4, 16).
coordenadas(d102, d1, 7, 5).
coordenadas(d104, d1, 7, 9).
coordenadas(d106, d1, 7, 13).
coordenadas(d108, d1, 7, 18).

% Coordenadas Salas Edificio D - Piso 2
coordenadas(d201, d2, 4, 4).
coordenadas(d202, d2, 6, 9).
coordenadas(d203, d2, 4, 9).
coordenadas(d204, d2, 7, 14).
coordenadas(d205, d2, 4, 14).
coordenadas(d206, d2, 5, 16).

% Coordenadas Salas Edificio D - Piso 3
coordenadas(d301, d3, 4, 8).
coordenadas(d302, d3, 8, 8).
coordenadas(d303, d3, 4, 10).
coordenadas(d304, d3, 8, 10).
coordenadas(d305, d3, 6, 15).

% coordenadas dos elevadores
coordenadas(a1, 21, 1).
coordenadas(a2, 20, 1).
coordenadas(b1, 21, 7).
coordenadas(b2, 21, 7).
coordenadas(b3, 21, 7).
coordenadas(c1, 1, 11).
coordenadas(c2, 13, 11).
coordenadas(c3, 1, 11).
coordenadas(c4, 1, 12).
coordenadas(d2, 1, 1).
coordenadas(d2, 0, 11).
coordenadas(d3, 1, 1).

% Coordenadas das passagens
coordenadas(c2,d2, 0, 14, 12, 20).

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


% ALGORITMOS PARA ENCONTRAR OS CAMINHOS ENTRE EDIFICIOS E PISOS

liga(a,h).
liga(b,g).
liga(b,i).
liga(g,h).
liga(h,i).
liga(i,j).

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
% BC - Coordenadas Salas Edificio A - Piso 1
coordenadas(apn, a1, 10, 5).
coordenadas(beng, a1, 12, 2).
coordenadas(k1, a1, 16, 2).
coordenadas(k2, a1, 19, 2).
coordenadas(r1, a1, 12, 8).
coordenadas(r2, a1, 20, 8).

% BC - Coordenadas Salas Edificio B - Piso 1
coordenadas(b101, b1, 2, 4).
coordenadas(b102, b1, 2, 6).
coordenadas(b103, b1, 5, 4).
coordenadas(b104, b1, 6, 8).
coordenadas(b105, b1, 13, 4).
coordenadas(b106, b1, 16, 6).
coordenadas(b107, b1, 19, 4).
coordenadas(b108, b1, 19, 8).

% BC - Coordenadas Salas Edificio C - Piso 2
coordenadas(c201, c2, 2, 8).
coordenadas(c202, c2, 4, 4).
coordenadas(c203, c2, 5, 8).
coordenadas(c204, c2, 14, 5).
coordenadas(c205, c2, 10, 3).
coordenadas(c206, c2, 12, 3).
coordenadas(c207, c2, 11, 8).
coordenadas(c209, c2, 16, 9).

% BC - Coordenadas Salas Edificio D - Piso 2
coordenadas(d201, d2, 4, 8).
coordenadas(d202, d2, 9, 6).
coordenadas(d203, d2, 9, 8).
coordenadas(d204, d2, 13, 4).
coordenadas(d205, d2, 13, 8).
coordenadas(d206, d2, 16, 5).

% coordenadas dos elevadores
coordenadas(b1, 1, 1).
coordenadas(b2, 1, 1).
coordenadas(b3, 1, 1).
coordenadas(b4, 1, 1).
coordenadas(g2, 2, 2).
coordenadas(g3, 2, 2).
coordenadas(g4, 2, 2).
coordenadas(i1, 1, 1).
coordenadas(i2, 1, 1).
coordenadas(i3, 1, 1).
coordenadas(i4, 1, 1).
coordenadas(j1, 2, 2).
coordenadas(j2, 2, 2).
coordenadas(j3, 2, 2).
coordenadas(j4, 2, 2).

% Coordenadas das passagens
coordenadas(a1,h2, 23, 11, 11, 23).
coordenadas(b2,g2, 23, 11, 11, 23).
coordenadas(b3,g3, 23, 11, 11, 23).
coordenadas(b3,i3, 23, 11, 11, 23).
coordenadas(g2,h2, 23, 11, 11, 23).
coordenadas(g3,h3, 23, 11, 11, 23).
coordenadas(h2,i2, 23, 11, 11, 23).
coordenadas(i1,j1, 23, 11, 11, 23).
coordenadas(i2,j2, 23, 11, 11, 23).
coordenadas(i3,j3, 23, 11, 11, 23).


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


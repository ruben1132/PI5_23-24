% ALGORITMOS PARA ENCONTRAR OS CAMINHOS ENTRE EDIFICIOS E PISOS

liga(a,h).
liga(b,g).
liga(b,i).
liga(g,h).
liga(h,i).
liga(i,j).

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

corredor(a,h,a1,h2).
corredor(b,g,b2,g2).
corredor(b,g,b3,g3).
corredor(b,i,b3,i3).
corredor(g,h,g2,h2).
corredor(g,h,g3,h3).
corredor(h,i,h2,i2).
corredor(i,j,i1,j1).
corredor(i,j,i2,j2).
corredor(i,j,i3,j3).


% c encontrar um caminho entre pisos de edificios usando corredores e
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
    (corredor(EdAct,EdSeg,PisoAct,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct)),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),cor(PisoAct1,PisoSeg)|LOutrasLig]):-
    (corredor(EdAct,EdSeg,PisoAct1,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct1)),PisoAct1\==PisoAct,
    elevador(EdAct,LPisos),member(PisoAct,LPisos),member(PisoAct1,LPisos),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).


% d escolher o caminho que envolve menos utilizacoes de elevadores e em
% caso de iguadade menos utilizacao de corredores, menos trocos
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


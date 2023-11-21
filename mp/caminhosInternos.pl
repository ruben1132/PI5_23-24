% ALGORITMOS PARA OS MOVIMENTOS DO ROBO NO INTERIOR DE CADA PISO
:-dynamic ligacel/2.

% floorMapsBC.pl - mapas dos pisos
:- consult('floorMapsBC.pl').

% coordenadasBC.pl - coordenadas dos elevadores, salas, passagens
:- consult('coordenadasBC.pl').


cria_grafo(_,0, _):-!.
cria_grafo(Col,Lin, Piso):-cria_grafo_lin(Col,Lin, Piso),Lin1 is Lin-1,cria_grafo(Col,Lin1, Piso).


cria_grafo_lin(0,_,_):-!.
cria_grafo_lin(Col,Lin,Piso):-m(Piso,Col,Lin,0),!,ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
    ((m(Piso,ColS,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((m(Piso,ColA,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((m(Piso,Col,LinS,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinS)));true)),
    ((m(Piso,Col,LinA,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinA)));true)),
	((m(Piso,ColS,LinS,0), m(Piso,ColS,Lin,0), m(Piso,Col,LinS,0), assertz(ligacel(cel(Col,Lin),cel(ColS,LinS)));true)),
	((m(Piso,ColA,LinA,0), m(Piso,ColA,Lin,0), m(Piso,Col,LinA,0), assertz(ligacel(cel(Col,Lin),cel(ColA,LinA)));true)),
	((m(Piso,ColA,LinS,0), m(Piso,ColA,Lin,0), m(Piso,Col,LinS,0), assertz(ligacel(cel(Col,Lin),cel(ColA,LinS)));true)),
	((m(Piso,ColS,LinA,0), m(Piso,ColS,Lin,0), m(Piso,Col,LinA,0), assertz(ligacel(cel(Col,Lin),cel(ColS,LinA)));true)),
    Col1 is Col-1,
    cria_grafo_lin(Col1,Lin,Piso).
cria_grafo_lin(Col,Lin,Piso):-Col1 is Col-1,cria_grafo_lin(Col1,Lin,Piso).



dfs(Orig,Dest,Cam):-
	dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-
	reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam):-
	ligacel(Act,X),
        \+ member(X,LA),
	dfs2(X,Dest,[X|LA],Cam).


all_dfs(Orig,Dest,LCam):-findall(Cam,dfs(Orig,Dest,Cam),LCam).


better_dfs(Orig,Dest,Cam):-all_dfs(Orig,Dest,LCam), shortlist(LCam,Cam,_).


shortlist([L],L,N):-!,length(L,N).
shortlist([L|LL],Lm,Nm):-shortlist(LL,Lm1,Nm1),
				length(L,NL),
			((NL<Nm1,!,Lm=L,Nm is NL);(Lm=Lm1,Nm is Nm1)).


bfs(Orig,Dest,Cam):-bfs2(Dest,[[Orig]],Cam).

bfs2(Dest,[[Dest|T]|_],Cam):-
	reverse([Dest|T],Cam).

bfs2(Dest,[LA|Outros],Cam):-
	LA=[Act|_],
	findall([X|LA],
		(Dest\==Act,ligacel(Act,X),\+ member(X,LA)),
		Novos),
	append(Outros,Novos,Todos),
	bfs2(Dest,Todos,Cam).



% ALGORITMOS PARA OS MOVIMENTOS DO ROBO NO INTERIOR DE CADA PISO
:-dynamic ligacel/3.

% floorMapsBC.pl - mapas dos pisos
:- consult('floorMapsBC.pl').



cria_grafo(_,0, _):-!.
cria_grafo(Col,Lin, Piso):-cria_grafo_lin(Col,Lin, Piso),Lin1 is Lin-1,cria_grafo(Col,Lin1, Piso).


cria_grafo_lin(0,_,_):-!.
cria_grafo_lin(Col,Lin,Piso):-m(Piso,Col,Lin,0),!,ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
    ((m(Piso,ColS,Lin,0),assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,Lin)));true)),
    ((m(Piso,ColA,Lin,0),assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,Lin)));true)),
    ((m(Piso,Col,LinS,0),assertz(ligacel(Piso,cel(Col,Lin),cel(Col,LinS)));true)),
    ((m(Piso,Col,LinA,0),assertz(ligacel(Piso,cel(Col,Lin),cel(Col,LinA)));true)),
	((m(Piso,ColS,LinS,0), m(Piso,ColS,Lin,0), m(Piso,Col,LinS,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,LinS)));true)),
	((m(Piso,ColA,LinA,0), m(Piso,ColA,Lin,0), m(Piso,Col,LinA,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,LinA)));true)),
	((m(Piso,ColA,LinS,0), m(Piso,ColA,Lin,0), m(Piso,Col,LinS,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColA,LinS)));true)),
	((m(Piso,ColS,LinA,0), m(Piso,ColS,Lin,0), m(Piso,Col,LinA,0), assertz(ligacel(Piso,cel(Col,Lin),cel(ColS,LinA)));true)),
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

% A STAR

% calcular a distância euclidiana entre duas células
distancia_euclidiana_celula(cel(X1, Y1, _), cel(X2, Y2, _), Distancia) :-
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
        (ligacel(Piso, Act, X, CustoX);ligacel(Piso, X, Act, CustoX)),  % ligações bidirecionais
        \+ member(X, LA),
        CaX is CustoX + Ca, 
        distancia_euclidiana_celula(X, Dest, EstX),
        CEX is CaX + EstX),
        Novos),
    append(Outros, Novos, Todos),
    sort(Todos, TodosOrd),
    aStar2(Piso, Dest, TodosOrd, Cam, Custo).
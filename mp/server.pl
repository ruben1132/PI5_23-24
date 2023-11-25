:- consult('caminhos.pl').
:- consult('parsers.pl').

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).


% :- json_object movimentosTot_json_array(array:list(movimentos_json_array)).
% :- json_object movimentos_json_array(list(string)).





:- http_handler('/findCaminho', find_caminho_handler, [method(get), prefix]).

find_caminho_handler(Request) :-

    % For testing, use fixed values
    Algoritmo = astar,
    Origem = sala(apn),
    Destino = sala(beng),
    
    % Calling the predicate with the fixed values
    find_caminho_entidades(Algoritmo, Origem, Destino, ListaCaminho, ListaMovimentos, Custo),

    convert_lista_caminho(ListaCaminho, CaminhoJson),
    convert_lista_movimentos(ListaMovimentos, MovimentosJson),
    reply_json(json{caminho: CaminhoJson, movimentos: MovimentosJson, variavel: Custo },[json_object(dict)]).


% Starting the server on port 5000
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).




% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




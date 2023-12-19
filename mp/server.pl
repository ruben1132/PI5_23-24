:- consult('caminhos.pl').
% :- consult('algGenetico.pl').
:- consult('parsers.pl').

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- use_module(library(http/http_cors)).

% Funções do Servidor
:- set_setting(http:cors, [*]).

% Starting the server on port 5000
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).



:- http_handler('/findPath', find_caminho_handler, []).
:- http_handler('/planning', planning_handler, []).

find_caminho_handler(Request) :-
    cors_enable(Request, [methods([get]),
                          origin('http://localhost:5095')]),
    % Extract parameters from the request
    http_parameters(Request, [algorithm(A, []),origin(O,[]),destiny(D,[])]),
  
    parse_ponto_acesso(O, ParsedOrigem),
    parse_ponto_acesso(D, ParsedDestino),


    % phrase(parse_ponto_acesso(Origem), [O]),
    % % For testing, use fixed values
    % Algoritmo = dfs,
    % Origem = pass(a2,b2),
    % Destino = pass(b2,c3),
    
    % Calling the predicate with the fixed values
    find_caminho_entidades(A, ParsedOrigem, ParsedDestino, ListaCaminho, ListaMovimentos, Custo),
    % find_caminho_entidades(Algoritmo, Origem, Destino, ListaCaminho, ListaMovimentos, Custo),

    convert_lista_caminho(ListaCaminho, CaminhoJson),
    convert_lista_movimentos(ListaMovimentos, MovimentosJson),
    reply_json(json{path: CaminhoJson, movements: MovimentosJson, totalCost: Custo },[json_object(dict)]).


 planning_handler(Request):-
   cors_enable(Request, [methods([get]),
                          origin('http://localhost:2225')]),
    http_read_json_dict(Request, JSONData),         % Extract JSON data from the request
    Tasks = JSONData.get(tasks, []),                % Extract tasks array from JSON data

    % Extract algorithm from JSON data
    Algorithm = JSONData.get(algorithm, ''),

    % Process the tasks as needed
    process_tasks(Tasks, Algorithm, Result),

    % Respond with the result
    reply_json(Result, [json_object(dict)]).



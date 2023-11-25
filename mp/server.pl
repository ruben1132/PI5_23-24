:- consult('caminhos.pl').

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

:- http_handler('/findCaminho', find_caminho_handler, [method(get)]).

find_caminho_handler(Request) :-
    http_parameters(Request, [param1(Param1, [default('')]),
                              param2(Param2, [default('')]),
                              param3(Param3, [default('')])]),
    find_caminho_entidades(Param1, Param2, Param3, Lista, Variavel),
    reply_json(json([lista=Lista, variavel=Variavel])).


% Inicie o servidor na porta 5000
:- http_server(http_dispatch, [port(5000)]).
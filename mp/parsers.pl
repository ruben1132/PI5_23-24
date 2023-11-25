%%%%%%%%%%%%%%%%%%%%%% MOVIMENTOS ROBO %%%%%%%%%%%%%%%%%%%%%%

% Predicate to convert cel/2 term to JSON object
cel_to_json(cel(X, Y), json(['x'-X, 'y'-Y])).

% Predicate to convert list of cel/2 terms to JSON array
cel_list_to_json([], []).
cel_list_to_json([Cel | Rest], [JsonCel | JsonRest]) :-
    cel_to_json(Cel, JsonCel),
    cel_list_to_json(Rest, JsonRest).

% Predicate to convert list of lists of cel/2 terms to JSON array
cel_lists_to_json([], []).
cel_lists_to_json([CelList | Rest], [JsonCelList | JsonRest]) :-
    cel_list_to_json(CelList, JsonCelList),
    cel_lists_to_json(Rest, JsonRest).

% Main predicate to convert the input to JSON
convert_lista_movimentos(Input, JsonOutput) :-
    cel_lists_to_json(Input, JsonOutput).


%%%%%%%%%%%%%%%%%%%%%% CAMINHO ENTRE EDIFICIOS %%%%%%%%%%%%%%%%%%%%%%

% Predicate to convert any term to a string
term_to_string(Term, String) :-
    term_string(Term, String).

% Predicate to convert a list of terms to a list of strings
terms_to_strings([], []).
terms_to_strings([Term | Rest], [String | StringRest]) :-
    term_to_string(Term, String),
    terms_to_strings(Rest, StringRest).

% Main predicate to convert the input list to a JSON array of strings
convert_lista_caminho(Input, JsonOutput) :-
    terms_to_strings(Input, JsonOutput).


%%%%%%%%%%%%%%%%%%%%%% PARAMETROS GET /findCaminho %%%%%%%%%%%%%%%%%%%%%%
% converte de string para termo prolog
parse_ponto_acesso(PontoAcesso, ParsedPontoAcesso) :-
                    term_string(ParsedPontoAcesso, PontoAcesso, []).
liga(a,b).
liga(b,c).
liga(b,d).
liga(c,d).

pisos(a,[a1,a2]).
pisos(b,[b1,b2,b3]).
pisos(c,[c1,c2,c3,c4]).
pisos(d,[d1,d2,d3]).

dimensoes(a1, 22, 10).
dimensoes(a2, 22, 10).
dimensoes(b1, 22, 10).
dimensoes(b2, 22, 10).
dimensoes(b3, 22, 10).
dimensoes(c1, 12, 20).
dimensoes(c2, 12, 20).
dimensoes(c3, 12, 20).
dimensoes(c4, 12, 20).
dimensoes(d1, 12, 20).
dimensoes(d2, 12, 20).
dimensoes(d3, 12, 20).

elevador(a,[a1,a2]).
elevador(b,[b1,b2,b3]).
elevador(c,[c1,c2,c3,c4]).
elevador(d,[d1,d2,d3]).

passagem(a,b,a2,b2).
passagem(b,c,b2,c3).
passagem(b,d,b2,d3).
passagem(b,c,b3,c4).
passagem(c,d,c2,d2).
passagem(c,d,c3,d3).

% Salas Edificio A - Piso 1
sala(apn, a1).
sala(beng, a1).
sala(k1, a1).
sala(k2, a1).
sala(r1, a1).
sala(r2, a1).

% Salas Edificio A - Piso 2
sala(a201, a2).
sala(a202, a2).
sala(a203, a2).
sala(a204, a2).
sala(a205, a2).
sala(a206, a2).
sala(a207, a2).
sala(a207b, a2).
sala(a209, a2).

% Salas Edificio B - Piso 1
sala(b101, b1).
sala(b102, b1).
sala(b103, b1).
sala(b104, b1).
sala(b105, b1).
sala(b106, b1).
sala(b107, b1).
sala(b108, b1).

% Salas Edificio B - Piso 2
sala(b201, b2).
sala(b202, b2).
sala(b203, b2).
sala(b205, b2).
sala(b207, b2).

% Salas Edificio B - Piso 3
sala(b301, b3).
sala(b302, b3).
sala(b303, b3).
sala(b305, b3).

% Salas Edificio C - Piso 1
sala(c101, c1).
sala(c103, c1).
sala(c105, c1).
sala(c102, c1).
sala(c104, c1).
sala(c106, c1).
sala(c108, c1).
sala(c110, c1).

% Salas Edificio C - Piso 2
sala(c201, c2).
sala(c202, c2).
sala(c203, c2).
sala(c204, c2).
sala(c205, c2).
sala(c206, c2).
sala(c207, c2).
sala(c209, c2).

% Salas Edificio C - Piso 3
sala(c301, c3).
sala(c302, c3).
sala(c303, c3).
sala(c304, c3).
sala(c305, c3).
sala(c306, c3).
sala(c308, c3).
sala(c310, c3).

% Salas Edificio C - Piso 4
sala(c401, c4).
sala(c402, c4).
sala(c403, c4).
sala(c404, c4).

% Salas Edificio D - Piso 1
sala(d101, d1).
sala(d103, d1).
sala(d105, d1).
sala(d102, d1).
sala(d104, d1).
sala(d106, d1).
sala(d108, d1).

% Salas Edificio D - Piso 2
sala(d201, d2).
sala(d202, d2).
sala(d203, d2).
sala(d204, d2).
sala(d205, d2).
sala(d206, d2).

% Salas Edificio D - Piso 3
sala(d301, d3).
sala(d302, d3).
sala(d303, d3).
sala(d304, d3).
sala(d305, d3).
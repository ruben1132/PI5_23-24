liga(a,b).
liga(b,c).
liga(b,d).
liga(c,d).

pisos(a,[a1,a2]).
pisos(b,[b1,b2,b3]).
pisos(c,[c1,c2,c3,c4]).
pisos(d,[d1,d2,d3]).

dimensoes(a1, 23, 11).
dimensoes(a2, 23, 11).
dimensoes(b1, 23, 11).
dimensoes(b2, 23, 11).
dimensoes(b3, 23, 11).
dimensoes(c1, 13, 21).
dimensoes(c2, 13, 21).
dimensoes(c3, 13, 21).
dimensoes(c4, 13, 21).
dimensoes(d1, 13, 21).
dimensoes(d2, 13, 21).
dimensoes(d3, 13, 21).

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
sala(a211, a2).
sala(a212, a2).
sala(a213, a2).
sala(a214, a2).
sala(a215, a2).
sala(a216, a2).
sala(a217, a2).
sala(a217b, a2).
sala(a219, a2).

% Salas Edificio B - Piso 1
sala(b111, b1).
sala(b113, b1).
sala(b113, b1).
sala(b114, b1).
sala(b115, b1).
sala(b116, b1).
sala(b117, b1).
sala(b118, b1).

% Salas Edificio B - Piso 2
sala(b211, b2).
sala(b212, b2).
sala(b213, b2).
sala(b215, b2).
sala(b217, b2).

% Salas Edificio B - Piso 3
sala(b301, b3).
sala(b302, b3).
sala(b303, b3).
sala(b305, b3).

% Salas Edificio C - Piso 1
sala(c111, c1).
sala(c113, c1).
sala(c115, c1).
sala(c113, c1).
sala(c114, c1).
sala(c116, c1).
sala(c118, c1).
sala(c111, c1).

% Salas Edificio C - Piso 2
sala(c211, c2).
sala(c212, c2).
sala(c213, c2).
sala(c214, c2).
sala(c215, c2).
sala(c216, c2).
sala(c217, c2).
sala(c219, c2).

% Salas Edificio C - Piso 3
sala(c301, c3).
sala(c302, c3).
sala(c303, c3).
sala(c304, c3).
sala(c305, c3).
sala(c306, c3).
sala(c308, c3).
sala(c311, c3).

% Salas Edificio C - Piso 4
sala(c401, c4).
sala(c402, c4).
sala(c403, c4).
sala(c404, c4).

% sala Salas Edificio D - Piso 1
sala(d101, d1).
sala(d103, d1).
sala(d105, d1).
sala(d102, d1).
sala(d104, d1).
sala(d106, d1).
sala(d108, d1).

% sala Salas Edificio D - Piso 2
sala(d201, d2).
sala(d202, d2).
sala(d203, d2).
sala(d204, d2).
sala(d205, d2).
sala(d206, d2).

% sala Salas Edificio D - Piso 3
sala(d301, d3).
sala(d302, d3).
sala(d303, d3).
sala(d304, d3).
sala(d305, d3).
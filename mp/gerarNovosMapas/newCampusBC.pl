liga(a,b).
liga(b,c).
liga(b,d).
liga(c,d).

pisos(a,[a1]).
pisos(b,[b1,b2]).
pisos(c,[c1,c2,c3]).
pisos(d,[d1,d2]).

custo(elev,3).
custo(pass,5).

dimensoes(a1, 8, 8).
dimensoes(b1, 8, 8).
dimensoes(b2, 8, 8).
dimensoes(c1, 8, 8).
dimensoes(c2, 8, 8).
dimensoes(c3, 8, 8).
dimensoes(d1, 8, 8).
dimensoes(d2, 8, 8).

elevador(a,[a1]).
elevador(b,[b1,b2]).
elevador(c,[c1,c2,c3]).
elevador(d,[d1,d2]).

passagem(a,b,a1,b2).
passagem(b,c,b2,c3).
passagem(b,d,b2,d2).
passagem(c,d,c3,d2).

% Salas Edificio A - Piso 1
sala(a11, a1).
sala(a22, a1).

% Salas Edificio B - Piso 1
sala(b11, b1).
sala(b12, b1).

% Salas Edificio B - Piso 2
sala(b21, b2).
sala(b22, b2).

% Salas Edificio C - Piso 1
sala(c11, c1).
sala(c12, c1).

% Salas Edificio C - Piso 2
sala(c21, c2).
sala(c22, c2).

% Salas Edificio C - Piso 3
sala(c31, c3).
sala(c32, c3).

% sala Salas Edificio D - Piso 1
sala(d11, d1).
sala(d12, d1).

% sala Salas Edificio D - Piso 2
sala(d21, d2).
sala(d22, d2).

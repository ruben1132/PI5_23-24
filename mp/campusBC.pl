liga(a,b).
liga(b,c).
liga(b,d).
liga(c,d).

pisos(a,[a1,a2]).
pisos(b,[b1,b2,b3]).
pisos(c,[c1,c2,c3,c4]).
pisos(d,[d1,d2,d3]).

elevador(a,[a1,a2]).
elevador(b,[b1,b2,b3]).
elevador(c,[c1,c2,c3,c4]).
elevador(d,[d1,d2,d3]).

sala(a101, a, a1).
sala(b101, b, b1).
sala(b202, b, b2).
sala(b303, b, b3).
sala(b404, b, b4).

passagem(a,b,a2,b2).
passagem(b,c,b2,c3).
passagem(b,d,b2,d3).
passagem(b,c,b3,c4).
passagem(c,d,c2,d2).
passagem(c,d,c3,d3).
import enum
import math

def manhattan(usuario_um_avaliacoes, usuario_dois_avaliacoes):
    distancia = 0

    for filme in usuario_um_avaliacoes:
        if(usuario_um_avaliacoes[filme] != '-' and usuario_dois_avaliacoes[filme] != '-'):
            distancia += abs(float(usuario_um_avaliacoes[filme]) - float(usuario_dois_avaliacoes[filme]))

    return distancia

def calcular_usuario_mais_similar(avaliacoes_usuario, tabela_avaliacao):
    usuario_mais_similar = ""
    distancia_menor = math.inf

    for usuario in tabela_avaliacao:
        distancia_usuarios = manhattan(avaliacoes_usuario, tabela_avaliacao[usuario])

        if(distancia_usuarios < distancia_menor):
            distancia_menor = distancia_usuarios
            usuario_mais_similar = usuario

    return usuario_mais_similar

def recomendar_filme(avaliacoes_usuario, tabela_avaliacao):
    usuario_mais_similar = calcular_usuario_mais_similar(avaliacoes_usuario, tabela_avaliacao)

    filmes_nao_assistidos_por_usuario = list({filme:nota for (filme, nota) in avaliacoes_usuario.items() if nota == '-'})

    avaliacoes_usuario_similar_nao_assistidos = {filme:nota for (filme, nota) in tabela_avaliacao[usuario_mais_similar].items() if filme in filmes_nao_assistidos_por_usuario}

    recomendacoes_ordenadas = sorted(avaliacoes_usuario_similar_nao_assistidos.items(), key=lambda filme_avaliacao: filme_avaliacao[1], reverse=True)

    return recomendacoes_ordenadas[0][0]

def programa():
    tabela_avaliacao = {}

    numero_linhas = int(input())

    usuarios = input().split(",")

    filmes = input().split(",")

    for number in range(numero_linhas):
        avaliacoes_usuario_n_notas = input().split(" ")

        avaliacoes_usuario_n = {}

        for index_filme, filme in enumerate(filmes):
            avaliacoes_usuario_n[filme] = avaliacoes_usuario_n_notas[index_filme]

        tabela_avaliacao[usuarios[number]] = avaliacoes_usuario_n 

    avaliacoes_usuario = {}
    avaliacoes_usuario_notas = input().split(" ")

    for index_filme, filme in enumerate(filmes):
            avaliacoes_usuario[filme] = avaliacoes_usuario_notas[index_filme]

    filme = recomendar_filme(avaliacoes_usuario, tabela_avaliacao)

    print(filme)

programa()

"""
4
JorginDa12,PeachBros,BobPalhaDeAco,PolvoMolusco
O senhor dos pastéis,Harry Porco,A culpa é dos meteoros,O Deus veste Gucci
8.0 4.0 - 5.8
3.0 9.0 - -
- 5.0 10 8.0
- 10 - -
- - 10 7.2
"""
import math

tabela_avaliacao = {
    "ShiryuCegueta": {
        "Homem Tarântula: Sem volta pra toca": 4.5,
        "Harry Wesley e a Rocha da Filosofia": 5.0,
        "O senhor dos brincos: A sociedade do Brinco": 2.0,
        "Catman: O Gatinho das trevas": 4.4,
        "Earth Wars: O despertar da Fraqueza": 3.3
    },
    "Kuririn21": {
        "Homem Tarântula: Sem volta pra toca": 	3.2,
        "Harry Wesley e a Rocha da Filosofia": 1.5,
        "O senhor dos brincos: A sociedade do Brinco": 4.2,
        "Catman: O Gatinho das trevas": 3.1,
        "Earth Wars: O despertar da Fraqueza": 5.0
    },
    "SasukeEmo": {
        "Homem Tarântula: Sem volta pra toca": 1.1,
        "Harry Wesley e a Rocha da Filosofia": 2.1,
        "O senhor dos brincos: A sociedade do Brinco": 3.2,
        "Catman: O Gatinho das trevas": 0.5,
        "Earth Wars: O despertar da Fraqueza": 3.0
    },
    "AshDeJuliet": {
        "Homem Tarântula: Sem volta pra toca": 2.0,
        "Harry Wesley e a Rocha da Filosofia": 4.2,
        "O senhor dos brincos: A sociedade do Brinco": 1.1,
        "Catman: O Gatinho das trevas": 2.3,
        "Earth Wars: O despertar da Fraqueza": 1.0
    },
    "CarecaDaPorrada": {
        "Homem Tarântula: Sem volta pra toca": 5.0,
        "Harry Wesley e a Rocha da Filosofia": 4.2,
        "O senhor dos brincos: A sociedade do Brinco": 4.7,
        "Catman: O Gatinho das trevas": 1.0,
        "Earth Wars: O despertar da Fraqueza": 3.3
    }
}


def manhattan(usuario_um, usuario_dois):
    distancia = abs(usuario_um["Homem Tarântula: Sem volta pra toca"] - usuario_dois["Homem Tarântula: Sem volta pra toca"])
    + abs(usuario_um["Harry Wesley e a Rocha da Filosofia"] - usuario_dois["Harry Wesley e a Rocha da Filosofia"])
    + abs(usuario_um["O senhor dos brincos: A sociedade do Brinco"] - usuario_dois["O senhor dos brincos: A sociedade do Brinco"])
    + abs(usuario_um["Catman: O Gatinho das trevas"] - usuario_dois["Catman: O Gatinho das trevas"])
    + abs(usuario_um["Earth Wars: O despertar da Fraqueza"] - usuario_dois["Earth Wars: O despertar da Fraqueza"])

    return distancia


def calcular_usuario_mais_similar(avaliacoes_novo_usuario):
    usuario_mais_similar = ""
    distancia_menor = math.inf

    for usuario in tabela_avaliacao:
        distancia_usuarios = manhattan(
            avaliacoes_novo_usuario, tabela_avaliacao[usuario])

        if(distancia_usuarios < distancia_menor):
            distancia_menor = distancia_usuarios
            usuario_mais_similar = usuario

    return usuario_mais_similar


def programa():

    linha = input()

    valores_entrada = linha.split(" ")

    nome_novo_usuario = valores_entrada[0]

    avaliacoes_novo_usuario = {
        "Homem Tarântula: Sem volta pra toca": float(valores_entrada[1]),
        "Harry Wesley e a Rocha da Filosofia": float(valores_entrada[2]),
        "O senhor dos brincos: A sociedade do Brinco": float(valores_entrada[3]),
        "Catman: O Gatinho das trevas": float(valores_entrada[4]),
        "Earth Wars: O despertar da Fraqueza": float(valores_entrada[5])
    }

    usuario_mais_similar = calcular_usuario_mais_similar(avaliacoes_novo_usuario)

    usuario_mais_similar_avaliacoes = tabela_avaliacao[usuario_mais_similar]

    filmes_ordenados_por_avaliacao = sorted(usuario_mais_similar_avaliacoes.items(), key=lambda filme_avaliacao: filme_avaliacao[1], reverse=True)

    print(f"O usuário {usuario_mais_similar} destes três filmes então o usuário {nome_novo_usuario} possívelmente gostou/gostará:")
    for i in range(0, 3):
        print(f"- {filmes_ordenados_por_avaliacao[i][0]}")


programa()

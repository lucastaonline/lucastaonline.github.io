import math

tabela_avaliacao = {
    "ShiryuCegueta": {
        "Homem Tarântula: Sem volta pra toca": 4.5,
        "Harry Wesley e a Rocha da Filosofia": 5.0,
        "O senhor dos brincos: A sociedade do Brinco": 2.0
    },
    "Kuririn21": {
        "Homem Tarântula: Sem volta pra toca": 	3.2,
        "Harry Wesley e a Rocha da Filosofia": 1.5,
        "O senhor dos brincos: A sociedade do Brinco": 4.2
    },
    "SasukeEmo": {
        "Homem Tarântula: Sem volta pra toca": 1.1,
        "Harry Wesley e a Rocha da Filosofia": 2.1,
        "O senhor dos brincos: A sociedade do Brinco": 3.2
    }
}

def manhattan(usuario_um,usuario_dois):
    distancia = abs(usuario_um["Homem Tarântula: Sem volta pra toca"] - usuario_dois["Homem Tarântula: Sem volta pra toca"])
    - abs(usuario_um["Harry Wesley e a Rocha da Filosofia"] - usuario_dois["Harry Wesley e a Rocha da Filosofia"])
    - abs(usuario_um["O senhor dos brincos: A sociedade do Brinco"] - usuario_dois["O senhor dos brincos: A sociedade do Brinco"])

    return distancia

def calcular_usuario_mais_similar(avaliacoes_novo_usuario):
    usuario_mais_similar = ""
    distancia_menor = math.inf

    for usuario in tabela_avaliacao:
        distancia_usuarios = manhattan(avaliacoes_novo_usuario, tabela_avaliacao[usuario])

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
        "O senhor dos brincos: A sociedade do Brinco": float(valores_entrada[3])
    }

    usuario_mais_similar = calcular_usuario_mais_similar(avaliacoes_novo_usuario)

    print(f"O usuário {nome_novo_usuario} tem um perfil similar ao do usuário {usuario_mais_similar}.")

programa()
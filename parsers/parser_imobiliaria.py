import json
import os
1
caminho_arquivo = os.path.join(os.path.dirname(__file__), 'imobiliaria.json')

with open(caminho_arquivo, 'r', encoding='utf-8') as file:
    data = json.load(file)

imoveis = data["imobiliaria"]["imovel"]


print("LISTA DE IMÓVEIS DISPONÍVEIS:\n")
for idx, imovel in enumerate(imoveis, start=1):
    print(f"{idx} - {imovel['descricao']}")


try:
    escolha = int(input("\nDigite o número do imóvel que deseja ver detalhes: "))

    if 1 <= escolha <= len(imoveis):
        imovel = imoveis[escolha - 1]
        print("\n DETALHES DO IMÓVEL:\n")

        print(f" Descrição: {imovel['descricao']}\n")

        print(" Proprietário:")
        print("  Nome:", imovel["proprietario"]["nome"])

        if "telefone" in imovel["proprietario"]:
            for tel in imovel["proprietario"]["telefone"]:
                print("  Telefone:", tel)

        if "email" in imovel["proprietario"]:
            print("  Email:", imovel["proprietario"]["email"])

        print("\n Endereço:")
        endereco = imovel["endereco"]
        print(f"  Rua: {endereco['rua']}")
        print(f"  Bairro: {endereco['bairro']}")
        print(f"  Cidade: {endereco['cidade']}")
        if "numero" in endereco:
            print(f"  Número: {endereco['numero']}")

        print("\n Características:")
        caracteristicas = imovel["caracteristicas"]
        print(f"  Tamanho: {caracteristicas['tamanho']}m²")
        print(f"  Quartos: {caracteristicas['numQuartos']}")
        print(f"  Banheiros: {caracteristicas['numBanheiros']}")

        print(f"\n Valor: R$ {imovel['valor']:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."))

    else:
        print("ID inválido.")
except ValueError:
    print(" Entrada inválida. Digite um número.")
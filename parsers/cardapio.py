import os
from xml.dom import minidom

caminho_arquivo = os.path.join(os.path.dirname(__file__), 'cardapio.xml')

doc = minidom.parse(caminho_arquivo)

pratos = doc.getElementsByTagName("prato")

print("=== MENU DE PRATOS ===")
for i, prato in enumerate(pratos):
    nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue
    print(f"{i + 1} - {nome}")

escolha = input("\nDigite o número do prato para ver mais detalhes: ")

try:
    index = int(escolha) - 1
    if 0 <= index < len(pratos):
        prato = pratos[index]
        nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue
        descricao = prato.getElementsByTagName("descricao")[0].firstChild.nodeValue
        preco = prato.getElementsByTagName("preco")[0].firstChild.nodeValue
        tempo = prato.getElementsByTagName("tempo")[0].firstChild.nodeValue
        calorias = prato.getElementsByTagName("calorias")[0].firstChild.nodeValue

        print(f"\n--- Detalhes do prato ---")
        print(f"Nome: {nome}")
        print(f"Descrição: {descricao}")
        print("Ingredientes:")
        ingredientes = prato.getElementsByTagName("ingrediente")
        for ing in ingredientes:
            numero = ing.getAttribute("numero")
            texto = ing.firstChild.nodeValue
            print(f"  {numero} - {texto}")
        print(f"Preço: {preco}")
        print(f"Tempo de preparo: {tempo}")
        print(f"Calorias: {calorias}")
    else:
        print("Número inválido.")
except ValueError:
    print("Entrada inválida. Digite um número.")
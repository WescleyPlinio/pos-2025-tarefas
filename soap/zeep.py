import zeep

wsdl_url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL"
client = zeep.Client(wsdl=wsdl_url)

while True:
    print("==== Números em ingles por extenso ===")
    num = input("Digite um número inteiro:")

    if num.lower() == "sair":
        print("Até logo!")
        break

    numb = client.service.NumberToWords(num)
    print(50*"-")
    print(f"O número {num} em inglês é escrito como {numb}")
    print(50*"-")

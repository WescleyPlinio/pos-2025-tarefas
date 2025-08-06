import requests
from xml.dom import minidom

URL = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso"

def send_soap_request(action, body):
    headers = {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": f"http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/{action}"
    }
    response = requests.post(URL, data=body, headers=headers)
    response.raise_for_status()
    return response.content

def extract_value(xml_str, tag_name):
    dom = minidom.parseString(xml_str)
    elements = dom.getElementsByTagName(tag_name)
    if elements:
        return elements[0].firstChild.nodeValue
    return "Tag não encontrada"


def get_capital(country_code):
    body = f"""<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CapitalCity xmlns="http://www.oorsprong.org/websamples.countryinfo">
          <sCountryISOCode>{country_code}</sCountryISOCode>
        </CapitalCity>
      </soap:Body>
    </soap:Envelope>"""
    xml = send_soap_request("CapitalCity", body)
    return extract_value(xml, "m:CapitalCityResult")

def get_currency(country_code):
    body = f"""<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CountryCurrency xmlns="http://www.oorsprong.org/websamples.countryinfo">
          <sCountryISOCode>{country_code}</sCountryISOCode>
        </CountryCurrency>
      </soap:Body>
    </soap:Envelope>"""
    xml = send_soap_request("CountryCurrency", body)
    return extract_value(xml, "m:sName")


def get_country_name(country_code):
    body = f"""<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CountryName xmlns="http://www.oorsprong.org/websamples.countryinfo">
          <sCountryISOCode>{country_code}</sCountryISOCode>
        </CountryName>
      </soap:Body>
    </soap:Envelope>"""
    xml = send_soap_request("CountryName", body)
    return extract_value(xml, "m:CountryNameResult")

# Menu
def main():
    while True:
        print("======== MENU ========")
        print("1 - Capital de um país")
        print("2 - Moeda de um país")
        print("3 - Nome do país")
        print("4 - SAIR")

        opcao = input("Escolha uma opção (1-3): ")

        if opcao == "0":
            break

        codigo = input("Digite o código do país (ex: BR, US, FR, JP): ").upper()

        try:
            if opcao == "1":
                resultado = get_capital(codigo)
                print(100*"=")
                print(f"Capital de {codigo}: {resultado}")
                print(100*"=")

            elif opcao == "2":
                resultado = get_currency(codigo)
                print(100*"=")
                print(f"Moeda de {codigo}: {resultado}")
                print(100*"=")

            elif opcao == "3":
                resultado = get_country_name(codigo)
                print(100*"=")
                print(f"Nome do país {codigo}: {resultado}")
                print(100*"=")
                
            else:
                print("Opção inválida.")

        except Exception as e:
            print("Erro ao consultar API:", e)

if __name__ == "__main__":
    main()
import requests
from getpass import getpass

api_url = "https://suap.ifrn.edu.br/api/"

user = input("user: ")
password = getpass()
ano_letivo = int(input("Ano letivo: "))
periodo_letivo = int(input("Periodo letivo: "))

data = {"username":user,"password":password}

response = requests.post(api_url+"v2/autenticacao/token/", json=data)
if response.status_code == 200:
    token = response.json()["access"]

    headers = {
        "Authorization": f'Bearer {token}'
    }

    print(headers)

    response = requests.get(api_url+f"ensino/meu-boletim/{ano_letivo}/{periodo_letivo}/", json=data, headers=headers)

    dados = response.json()

    for disciplina in dados["results"]:
        print("-", disciplina["disciplina"])
else:
    print(f"Erro na autenticação: {response.status_code}")
    print(response.text)
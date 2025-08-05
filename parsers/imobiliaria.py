import json

imobiliaria = {
    "id": "1",
    "descricao": "Apartamento moderno com ótima localização",
    "proprietario": {
        "nome": "João Silva",
        "email": "joao@gmail.com",
        "telefone": ["1199999-0000", "1198888-1111"]
    }
}

with open("imobiliaria.json", "w") as json_file:
    json.dump(imobiliaria, json_file)

with open('imobiliaria.json') as json_file:
    parsed_imoboliaria = json.load(json_file)

json_string = '{"key": "value", "array": [1, 2, 3]}'
parsed_json = json.loads(json_string)

json_string = json.dumps(imobiliaria)
# GenerateUI Config (playground)

Este arquivo documenta opções locais do GenerateUI para o playground.

## Arquivo suportado

### `generateui-config.json`
Configura comportamento do app gerado (menu, rota padrão e título).

Campos:
- `appTitle`: string exibida no menu e outras áreas futuras.
- `defaultRoute`: rota que abre quando o usuário acessa `/` (localhost puro).
- `menu`: objeto com opções do menu.
  - `autoInject`: `true | false` (quando `false`, o gerador **não** injeta o layout/menu).

## Exemplo

Crie `generateui-config.json` na raiz do projeto:

```json
{
  "appTitle": "Rick & Morty Admin",
  "defaultRoute": "ListCharacters",
  "menu": {
    "autoInject": true
  }
}
```

Para desativar a injeção automática do menu:

```json
{
  "menu": {
    "autoInject": false
  }
}
```

## Notas
- `defaultRoute` deve existir em `routes.json`.

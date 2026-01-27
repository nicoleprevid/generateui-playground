export type GeneratedMenuItem = {
  id: string
  label: string
  route: string
  hidden?: boolean
  icon?: string
}

export type GeneratedMenuGroup = {
  id: string
  label: string
  items: GeneratedMenuItem[]
  hidden?: boolean
}

export type GeneratedMenu = {
  groups: GeneratedMenuGroup[]
  ungrouped: GeneratedMenuItem[]
}

export const generatedMenu: GeneratedMenu = {
  "groups": [
    {
      "id": "characters",
      "label": "Characters",
      "items": [
        {
          "id": "GetCharacter",
          "label": "Listar Personagens",
          "route": "GetCharacter"
        },
        {
          "id": "GetCharacterById",
          "label": "Buscar Personagem Por ID",
          "route": "GetCharacterById"
        }
      ]
    },
    {
      "id": "episodes",
      "label": "Episodes",
      "items": [
        {
          "id": "GetEpisode",
          "label": "Listar EpisóDios",
          "route": "GetEpisode"
        },
        {
          "id": "GetEpisodeById",
          "label": "Buscar EpisóDio Por ID",
          "route": "GetEpisodeById"
        }
      ]
    },
    {
      "id": "locations",
      "label": "Locations",
      "items": [
        {
          "id": "GetLocation",
          "label": "Listar LocalizaçõEs",
          "route": "GetLocation"
        },
        {
          "id": "GetLocationById",
          "label": "Buscar LocalizaçãO Por ID",
          "route": "GetLocationById"
        }
      ]
    }
  ],
  "ungrouped": []
}

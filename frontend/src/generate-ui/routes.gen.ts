
import { Routes } from '@angular/router'

export const generatedRoutes: Routes = [
  {
    path: 'getCharacter',
    loadComponent: () =>
      import('../app/features/GetCharacter/GetCharacter.component')
        .then(m => m.GetCharacterComponent)
  },
  {
    path: 'GetCharacter',
    loadComponent: () =>
      import('../app/features/GetCharacter/GetCharacter.component')
        .then(m => m.GetCharacterComponent)
  },
  {
    path: 'getCharacterById',
    loadComponent: () =>
      import('../app/features/GetCharacterById/GetCharacterById.component')
        .then(m => m.GetCharacterByIdComponent)
  },
  {
    path: 'GetCharacterById',
    loadComponent: () =>
      import('../app/features/GetCharacterById/GetCharacterById.component')
        .then(m => m.GetCharacterByIdComponent)
  },
  {
    path: 'getEpisode',
    loadComponent: () =>
      import('../app/features/GetEpisode/GetEpisode.component')
        .then(m => m.GetEpisodeComponent)
  },
  {
    path: 'GetEpisode',
    loadComponent: () =>
      import('../app/features/GetEpisode/GetEpisode.component')
        .then(m => m.GetEpisodeComponent)
  },
  {
    path: 'getEpisodeById',
    loadComponent: () =>
      import('../app/features/GetEpisodeById/GetEpisodeById.component')
        .then(m => m.GetEpisodeByIdComponent)
  },
  {
    path: 'GetEpisodeById',
    loadComponent: () =>
      import('../app/features/GetEpisodeById/GetEpisodeById.component')
        .then(m => m.GetEpisodeByIdComponent)
  },
  {
    path: 'getLocation',
    loadComponent: () =>
      import('../app/features/GetLocation/GetLocation.component')
        .then(m => m.GetLocationComponent)
  },
  {
    path: 'GetLocation',
    loadComponent: () =>
      import('../app/features/GetLocation/GetLocation.component')
        .then(m => m.GetLocationComponent)
  },
  {
    path: 'getLocationById',
    loadComponent: () =>
      import('../app/features/GetLocationById/GetLocationById.component')
        .then(m => m.GetLocationByIdComponent)
  },
  {
    path: 'GetLocationById',
    loadComponent: () =>
      import('../app/features/GetLocationById/GetLocationById.component')
        .then(m => m.GetLocationByIdComponent)
  }
]

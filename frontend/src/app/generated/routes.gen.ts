
import { Routes } from '@angular/router'

export const generatedRoutes: Routes = [
  {
    path: 'getAll',
    loadComponent: () =>
      import('../features/GetAll/GetAll.component')
        .then(m => m.GetAllComponent)
  },
  {
    path: 'GetAll',
    loadComponent: () =>
      import('../features/GetAll/GetAll.component')
        .then(m => m.GetAllComponent)
  },
  {
    path: 'getNameByName',
    loadComponent: () =>
      import('../features/GetNameByName/GetNameByName.component')
        .then(m => m.GetNameByNameComponent)
  },
  {
    path: 'GetNameByName',
    loadComponent: () =>
      import('../features/GetNameByName/GetNameByName.component')
        .then(m => m.GetNameByNameComponent)
  },
  {
    path: 'getRegionByRegion',
    loadComponent: () =>
      import('../features/GetRegionByRegion/GetRegionByRegion.component')
        .then(m => m.GetRegionByRegionComponent)
  },
  {
    path: 'GetRegionByRegion',
    loadComponent: () =>
      import('../features/GetRegionByRegion/GetRegionByRegion.component')
        .then(m => m.GetRegionByRegionComponent)
  }
]

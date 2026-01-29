import { Routes } from '@angular/router'
import { generatedRoutes } from '../generate-ui/routes.gen'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'searchAccountOfPhysicalControllerSearchPhysicalPersons' },
  ...generatedRoutes
]

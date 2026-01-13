import { Injectable } from '@angular/core'


// IMPORT ESTÁTICO (MVP)
// depois vira fetch / assets / api
import { ScreenSchema } from '../types/form-schema'
import Login from '../assets/generate-ui/overlays/Login.screen.json'
import CreateUser from '../assets/generate-ui/overlays/CreateUser.screen.json'
import CreateArticle from '../assets/generate-ui/overlays/CreateArticle.screen.json'



@Injectable({ providedIn: 'root' })
export class ScreenRegistryService {
  private screens: ScreenSchema[] = [
    Login as ScreenSchema,
    CreateUser as ScreenSchema,
    CreateArticle as ScreenSchema
  ]

  getAll() {
    return this.screens
  }

getByOperationId(id: string) {
  return this.screens.find(
    s => s.api.operationId === id
  )
}

}

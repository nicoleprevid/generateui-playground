import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ScreenRegistryService } from '../services/screen-registry.service'
import { ScreenRendererComponent } from '../components/screen-renderer.component'
import { ScreenSchema } from '../types/form-schema'
import { CommonModule } from '@angular/common'

@Component({
  standalone: true,
  imports: [ScreenRendererComponent, CommonModule],
  template: `
    <app-screen-renderer
      *ngIf="schema"
      [schema]="schema"
    />
  `
})
export class ScreenPage {
  schema!: ScreenSchema

  constructor(
    private route: ActivatedRoute,
    private registry: ScreenRegistryService
  ) {
    const operationId =
      this.route.snapshot.data['operationId']

    this.schema =
      this.registry.getByOperationId(operationId)!
  }
}

import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormRendererComponent } from './form-renderer/form-renderer.component'
import { TableRendererComponent } from './table-renderer.component'
import { ViewRendererComponent } from './view-renderer.component'
import { ScreenSchema } from '../types/form-schema'

@Component({
  selector: 'app-screen-renderer',
  standalone: true,
  imports: [
    CommonModule,
    FormRendererComponent,
    TableRendererComponent,
    ViewRendererComponent
  ],
  templateUrl: './screen-renderer.component.html'
})
export class ScreenRendererComponent {
  @Input() schema!: ScreenSchema
}

import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScreenSchema } from '../types/form-schema'

@Component({
  selector: 'app-view-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>View Renderer</h2>
    <pre>{{ schema | json }}</pre>
  `
})
export class ViewRendererComponent {
  @Input() schema!: ScreenSchema
}

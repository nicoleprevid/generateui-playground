import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScreenSchema } from '../types/form-schema'

@Component({
  selector: 'app-table-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Table Renderer</h2>
    <pre>{{ schema | json }}</pre>
  `
})
export class TableRendererComponent {
  @Input() schema!: ScreenSchema
}

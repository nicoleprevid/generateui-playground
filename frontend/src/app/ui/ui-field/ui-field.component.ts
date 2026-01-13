import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'

@Component({
  selector: 'ui-field',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ui-field.component.html',
  styleUrls: ['./ui-field.component.scss']
})
export class UiFieldComponent {
  @Input() label = ''
  @Input() hint = ''
}

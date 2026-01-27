import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms'

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  templateUrl: './ui-textarea.component.html',
  styleUrls: ['./ui-textarea.component.scss']
})
export class UiTextareaComponent {
  @Input() label = ''
  @Input() hint = ''
  @Input() info = ''
  @Input() controlName = ''
  @Input() placeholder = ''
  @Input() rows = 3
  @Input() invalid = false
  infoOpen = false

  toggleInfo(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.infoOpen = !this.infoOpen
  }
}

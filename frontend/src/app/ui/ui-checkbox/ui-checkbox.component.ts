import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms'

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  templateUrl: './ui-checkbox.component.html',
  styleUrls: ['./ui-checkbox.component.scss']
})
export class UiCheckboxComponent {
  @Input() label = ''
  @Input() hint = ''
  @Input() info = ''
  @Input() controlName = ''
  @Input() invalid = false
  infoOpen = false

  toggleInfo(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.infoOpen = !this.infoOpen
  }
}

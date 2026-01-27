import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms'

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss']
})
export class UiInputComponent {
  @Input() label = ''
  @Input() hint = ''
  @Input() info = ''
  @Input() controlName = ''
  @Input() placeholder = ''
  @Input() type: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' = 'text'
  @Input() invalid = false
  infoOpen = false

  toggleInfo(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.infoOpen = !this.infoOpen
  }
}

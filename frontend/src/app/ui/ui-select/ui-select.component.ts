import { Component, Input } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule
} from '@angular/forms'

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  templateUrl: './ui-select.component.html',
  styleUrls: ['./ui-select.component.scss']
})
export class UiSelectComponent {
  @Input() label = ''
  @Input() hint = ''
  @Input() info = ''
  @Input() controlName = ''
  @Input() options: any[] = []
  @Input() invalid = false
  infoOpen = false

  toggleInfo(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.infoOpen = !this.infoOpen
  }
}


import { Component } from '@angular/core'
import { JsonPipe, NgIf } from '@angular/common'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { UiCardComponent } from '../../ui/ui-card/ui-card.component'
import { UiFieldComponent } from '../../ui/ui-field/ui-field.component'
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component'
import { UpdateCurrentUserService } from './updatecurrentuser.service.gen'
import { UpdateCurrentUserGen } from './updatecurrentuser.gen'

@Component({
  selector: 'app-updatecurrentuser',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    ReactiveFormsModule,
    UiCardComponent,
    UiFieldComponent,
    UiButtonComponent
  ],
  templateUrl: './updatecurrentuser.component.html',
  styleUrls: ['./updatecurrentuser.component.scss']
})
export class UpdateCurrentUserComponent extends UpdateCurrentUserGen {
  constructor(
    protected override fb: FormBuilder,
    protected override service: UpdateCurrentUserService
  ) {
    super(fb, service)
  }

  submit() {
    const value = this.form.getRawValue()
    const params = this.pick(value, [])
    const body = this.pick(
      value,
      ["username","email","password"]
    )

    this.loading = true
    this.error = null

    this.service
      .execute(params, body)
      .subscribe({
        next: result => {
          this.result = result
          this.loading = false
        },
        error: error => {
          this.error = error
          this.loading = false
        }
      })
  }
}

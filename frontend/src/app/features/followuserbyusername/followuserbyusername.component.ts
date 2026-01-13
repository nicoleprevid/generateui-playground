
import { Component } from '@angular/core'
import { JsonPipe, NgIf } from '@angular/common'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { UiCardComponent } from '../../ui/ui-card/ui-card.component'
import { UiFieldComponent } from '../../ui/ui-field/ui-field.component'
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component'
import { FollowUserByUsernameService } from './followuserbyusername.service.gen'
import { FollowUserByUsernameGen } from './followuserbyusername.gen'

@Component({
  selector: 'app-followuserbyusername',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    ReactiveFormsModule,
    UiCardComponent,
    UiFieldComponent,
    UiButtonComponent
  ],
  templateUrl: './followuserbyusername.component.html',
  styleUrls: ['./followuserbyusername.component.scss']
})
export class FollowUserByUsernameComponent extends FollowUserByUsernameGen {
  constructor(
    protected override fb: FormBuilder,
    protected override service: FollowUserByUsernameService
  ) {
    super(fb, service)
  }

  submit() {
    const value = this.form.getRawValue()
    const params = this.pick(value, ["username"])
    const body = this.pick(
      value,
      []
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

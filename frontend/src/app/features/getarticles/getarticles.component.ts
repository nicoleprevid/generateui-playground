
import { Component } from '@angular/core'
import { JsonPipe, NgIf } from '@angular/common'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { UiCardComponent } from '../../ui/ui-card/ui-card.component'
import { UiFieldComponent } from '../../ui/ui-field/ui-field.component'
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component'
import { GetArticlesService } from './getarticles.service.gen'
import { GetArticlesGen } from './getarticles.gen'

@Component({
  selector: 'app-getarticles',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    ReactiveFormsModule,
    UiCardComponent,
    UiFieldComponent,
    UiButtonComponent
  ],
  templateUrl: './getarticles.component.html',
  styleUrls: ['./getarticles.component.scss']
})
export class GetArticlesComponent extends GetArticlesGen {
  constructor(
    protected override fb: FormBuilder,
    protected override service: GetArticlesService
  ) {
    super(fb, service)
  }

  submit() {
    const value = this.form.getRawValue()
    const params = this.pick(value, [])
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

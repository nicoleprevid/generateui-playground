
import { Component } from '@angular/core'
import { JsonPipe, NgIf } from '@angular/common'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { UiCardComponent } from '../../ui/ui-card/ui-card.component'
import { UiFieldComponent } from '../../ui/ui-field/ui-field.component'
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component'
import { UpdateArticleService } from './updatearticle.service.gen'
import { UpdateArticleGen } from './updatearticle.gen'

@Component({
  selector: 'app-updatearticle',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    ReactiveFormsModule,
    UiCardComponent,
    UiFieldComponent,
    UiButtonComponent
  ],
  templateUrl: './updatearticle.component.html',
  styleUrls: ['./updatearticle.component.scss']
})
export class UpdateArticleComponent extends UpdateArticleGen {
  constructor(
    protected override fb: FormBuilder,
    protected override service: UpdateArticleService
  ) {
    super(fb, service)
  }

  submit() {
    const value = this.form.getRawValue()
    const params = this.pick(value, ["slug"])
    const body = this.pick(
      value,
      ["title","description","body"]
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

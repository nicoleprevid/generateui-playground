
import { Component } from '@angular/core'
import { JsonPipe, NgFor, NgIf } from '@angular/common'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { UiCardComponent } from '../../ui/ui-card/ui-card.component'
import { UiFieldComponent } from '../../ui/ui-field/ui-field.component'
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component'
import { GetAllService } from './GetAll.service.gen'
import { GetAllGen } from './GetAll.gen'

@Component({
  selector: 'app-get-all',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    JsonPipe,
    ReactiveFormsModule,
    UiCardComponent,
    UiFieldComponent,
    UiButtonComponent
  ],
  templateUrl: './GetAll.component.html',
  styleUrls: ['./GetAll.component.scss']
})
export class GetAllComponent extends GetAllGen {
  constructor(
    protected override fb: FormBuilder,
    protected override service: GetAllService
  ) {
    super(fb, service)
  }

  submit() {
    const value = this.form.getRawValue()
    const pathParams = this.pick(value, [])
    const queryParams = this.pick(
      value,
      ["fields"]
    )
    const body = this.pick(
      value,
      []
    )

    this.loading = true
    this.error = null

    this.service
      .execute(pathParams, queryParams, body)
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

  isArrayResult() {
    return this.getRows().length > 0
  }

  getRows() {
    const value = this.result
    if (Array.isArray(value)) return value
    if (value && Array.isArray(value.items)) return value.items
    if (value && Array.isArray(value.results)) return value.results
    if (value && Array.isArray(value.data)) return value.data
    return []
  }

  getColumns() {
    const raw = this.form.get('fields')?.value
    if (typeof raw === 'string' && raw.trim().length > 0) {
      return raw
        .split(',')
        .map((value: string) => value.trim())
        .filter(Boolean)
    }

    const rows = this.getRows()
    if (rows.length > 0) {
      return Object.keys(rows[0])
    }

    return []
  }

  formatHeader(value: string) {
    return value
      .replace(/[_-]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/w/g, char => char.toUpperCase())
  }

  getCellValue(row: any, column: string) {
    if (!row || !column) return ''

    if (column.includes('.')) {
      return column
        .split('.')
        .reduce((acc, key) => (acc ? acc[key] : undefined), row) ?? ''
    }

    const value = row[column]
    if (column === 'name' && value) {
      return value.common || value.official || value
    }
    if (column === 'flags' && value) {
      return value.png || value.svg || value
    }

    if (value && typeof value === 'object') {
      return value.common || value.official || JSON.stringify(value)
    }

    return value ?? ''
  }

  isImageCell(row: any, column: string) {
    const value = this.getCellValue(row, column)
    return (
      typeof value === 'string' &&
      /^https?:\/\//.test(value) &&
      /(\.png|\.jpg|\.jpeg|\.svg)/i.test(value)
    )
  }

}

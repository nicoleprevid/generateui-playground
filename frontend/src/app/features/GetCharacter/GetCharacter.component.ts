
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { UiCardComponent } from '../../ui/ui-card/ui-card.component'
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component'
import { UiSelectComponent } from '../../ui/ui-select/ui-select.component'
import { UiCheckboxComponent } from '../../ui/ui-checkbox/ui-checkbox.component'
import { UiInputComponent } from '../../ui/ui-input/ui-input.component'
import { UiTextareaComponent } from '../../ui/ui-textarea/ui-textarea.component'
import { GetCharacterService } from './GetCharacter.service.gen'
import { GetCharacterGen } from './GetCharacter.gen'
import screenSchema from '../../../generate-ui/overlays/GetCharacter.screen.json'

@Component({
  selector: 'app-get-character',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiCardComponent,
    UiButtonComponent,
    UiSelectComponent,
    UiCheckboxComponent,
    UiInputComponent,
    UiTextareaComponent
  ],
  templateUrl: './GetCharacter.component.html',
  styleUrls: ['./GetCharacter.component.scss']
})
export class GetCharacterComponent extends GetCharacterGen {
  constructor(
    protected override fb: FormBuilder,
    protected override service: GetCharacterService
  ) {
    super(fb, service)
    this.setSchema(screenSchema as any)
  }

  submit() {
    const value = this.form.getRawValue()
    const pathParams = this.pick(value, this.pathParamNames)
    const queryParams = this.pick(value, this.queryParamNames)
    const body = this.pick(value, this.bodyFieldNames)

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
    if (!value || typeof value !== 'object') return []

    const commonKeys = ['data', 'items', 'results', 'list', 'records']
    for (const key of commonKeys) {
      if (Array.isArray(value[key])) return value[key]
    }

    for (const key of Object.keys(value)) {
      if (Array.isArray(value[key])) return value[key]
    }

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
    if (rows.length > 0 && rows[0] && typeof rows[0] === 'object') {
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
    return this.formatValue(value)
  }

  isImageCell(row: any, column: string) {
    const value = this.getCellValue(row, column)
    return (
      typeof value === 'string' &&
      /^https?:\/\//.test(value) &&
      /(\.png|\.jpg|\.jpeg|\.svg)/i.test(value)
    )
  }

  private formatValue(value: any): string {
    if (value === null || value === undefined) return ''
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value)
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    if (Array.isArray(value)) {
      return value
        .map((item: any) => this.formatValue(item))
        .join(', ')
    }
    if (typeof value === 'object') {
      if (typeof value.common === 'string') return value.common
      if (typeof value.official === 'string') return value.official
      if (typeof value.name === 'string') return value.name
      if (typeof value.label === 'string') return value.label
      return JSON.stringify(value)
    }
    return String(value)
  }

  getObjectRows() {
    const value = this.result
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return []
    }
    return this.flattenObject(value)
  }

  private flattenObject(
    value: Record<string, any>,
    prefix = ''
  ) {
    const rows: Array<{ key: string; value: string }> = []
    for (const [key, raw] of Object.entries(value)) {
      const fullKey = prefix ? prefix + '.' + key : key
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        rows.push(...this.flattenObject(raw, fullKey))
        continue
      }
      rows.push({ key: fullKey, value: this.formatValue(raw) })
    }
    return rows
  }

}

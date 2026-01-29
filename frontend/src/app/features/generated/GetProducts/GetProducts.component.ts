
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { UiCardComponent } from '../../ui/ui-card/ui-card.component'
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component'
import { UiSelectComponent } from '../../ui/ui-select/ui-select.component'
import { UiCheckboxComponent } from '../../ui/ui-checkbox/ui-checkbox.component'
import { UiInputComponent } from '../../ui/ui-input/ui-input.component'
import { UiTextareaComponent } from '../../ui/ui-textarea/ui-textarea.component'
import { GetProductsService } from './GetProducts.service.gen'
import { GetProductsGen } from './GetProducts.gen'
import screenSchema from '../../../../generate-ui/overlays/getProducts.screen.json'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-get-products',
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
  templateUrl: './GetProducts.component.html',
  styleUrls: ['./GetProducts.component.scss']
})
export class GetProductsComponent extends GetProductsGen implements OnInit, AfterViewInit, OnDestroy {
  private readonly autoRefresh = true
  private readonly allowDeepArraySearch = true
  private readonly onFocus = () => {
    if (this.autoRefresh && !this.loading) {
      this.submit()
    }
  }
  private readonly onVisibility = () => {
    if (
      this.autoRefresh &&
      typeof document !== 'undefined' &&
      document.visibilityState === 'visible'
    ) {
      this.submit()
    }
  }

  constructor(
    protected override fb: FormBuilder,
    protected override service: GetProductsService
  ) {
    super(fb, service)
    this.setSchema(screenSchema as any)
    this.applyPrefill()
  }

  ngOnInit() {
    this.ensureInitialLoad()
    this.setupAutoRefreshListeners()
  }

  ngAfterViewInit() {
    this.ensureInitialLoad()
  }

  ngOnDestroy() {
    if (!this.autoRefresh) return
    if (typeof window !== 'undefined') {
      window.removeEventListener('focus', this.onFocus)
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.onVisibility)
    }
  }

  private setupAutoRefreshListeners() {
    if (!this.autoRefresh) return
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', this.onFocus)
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibility)
    }
  }

  private ensureInitialLoad() {
    if (!this.autoRefresh) return
    if (this.loading || this.result$.value !== null) return
    this.submit()
  }

  private applyPrefill() {
    const state = (history as any)?.state
    const prefill = state?.prefill
    if (prefill) {
      this.form.patchValue(prefill)
      if (state?.autoSubmit) {
        this.submit()
      }
    }
  }

  submit() {
    const value = this.form.getRawValue()
    const pathParams = this.pick(value, this.pathParamNames)
    const queryParams = this.pick(value, this.queryParamNames)
    const body = this.pick(value, this.bodyFieldNames)

    this.loading = true
    this.error$.next(null)

    this.service
      .execute(pathParams, queryParams, body)
      .subscribe({
        next: result => {
          const normalized =
            result && typeof result === 'object' && 'body' in result
              ? (result as any).body
              : result
          this.result$.next(normalized)
          this.loading = false
        },
        error: error => {
          this.error$.next(error)
          this.loading = false
        }
      })
  }

  isArrayResult(raw?: any) {
    return this.getRows(raw).length > 0
  }

  getRows(raw?: any) {
    const value = this.unwrapResult(raw ?? this.result$.value)
    if (Array.isArray(value)) return value
    if (!value || typeof value !== 'object') return []

    const commonKeys = ['data', 'items', 'results', 'list', 'records', 'products']
    for (const key of commonKeys) {
      if (Array.isArray(value[key])) return value[key]
    }

    if (!this.allowDeepArraySearch) return []
    const found = this.findFirstArray(value, 0, 5)
    return found ?? []
  }

  getColumns(value?: any) {
    const fieldsRaw = this.form.get('fields')?.value
    if (typeof fieldsRaw === 'string' && fieldsRaw.trim().length > 0) {
      return fieldsRaw
        .split(',')
        .map((value: string) => value.trim())
        .filter(Boolean)
    }

    const rows = this.getRows(value)
    if (rows.length > 0 && rows[0] && typeof rows[0] === 'object') {
      return Object.keys(rows[0])
    }

    return []
  }

  formatHeader(value: string) {
    return value
      .replace(/[_-]/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, char => char.toUpperCase())
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

  formatValue(value: any): string {
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

  getCardImage(row: any) {
    if (!row || typeof row !== 'object') return ''
    const directKeys = ['thumbnail', 'image', 'avatar', 'photo', 'picture']
    for (const key of directKeys) {
      if (typeof row[key] === 'string') return row[key]
    }
    if (Array.isArray(row.images) && row.images.length) {
      return row.images[0]
    }
    return ''
  }

  getCardTitle(row: any) {
    if (!row || typeof row !== 'object') return 'Item'
    return (
      row.title ??
      row.name ??
      row.label ??
      row.id ??
      'Item'
    )
  }

  getCardSubtitle(row: any) {
    if (!row || typeof row !== 'object') return ''
    return (
      row.description ??
      row.category ??
      row.brand ??
      ''
    )
  }

  formatError(error: any) {
    if (!error) return ''
    if (typeof error === 'string') return error
    if (typeof error?.message === 'string') return error.message
    try {
      return JSON.stringify(error)
    } catch {
      return String(error)
    }
  }

  getObjectRows(raw?: any) {
    const value = this.unwrapResult(raw ?? this.result$.value)
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return []
    }
    return this.flattenObject(value)
  }

  hasObjectRows(raw?: any) {
    return this.getObjectRows(raw).length > 0
  }

  isSingleValue(raw?: any) {
    const value = this.unwrapResult(raw ?? this.result$.value)
    return (
      value !== null &&
      value !== undefined &&
      (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean')
    )
  }

  private unwrapResult(value: any) {
    if (!value || typeof value !== 'object') return value
    if (Object.prototype.hasOwnProperty.call(value, 'data')) {
      return value.data
    }
    if (Object.prototype.hasOwnProperty.call(value, 'result')) {
      return value.result
    }
    if (Object.prototype.hasOwnProperty.call(value, 'body')) {
      return value.body
    }
    return value
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

  private findFirstArray(
    value: any,
    depth: number,
    maxDepth: number
  ): any[] | null {
    if (!value || depth > maxDepth) return null
    if (Array.isArray(value)) return value
    if (typeof value !== 'object') return null

    for (const key of Object.keys(value)) {
      const found = this.findFirstArray(value[key], depth + 1, maxDepth)
      if (found) return found
    }
    return null
  }

}

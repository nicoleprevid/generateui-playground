
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { UiCardComponent } from '../../ui/ui-card/ui-card.component'
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component'
import { UiCheckboxComponent } from '../../ui/ui-checkbox/ui-checkbox.component'
import { UiInputComponent } from '../../ui/ui-input/ui-input.component'
import { UiTextareaComponent } from '../../ui/ui-textarea/ui-textarea.component'
import { UiSelectComponent } from '../../ui/ui-select/ui-select.component'
import { GetProductsService } from '../GetProducts/GetProducts.service.gen'
import { DeleteProductService } from '../DeleteProduct/DeleteProduct.service.gen'
import { BehaviorSubject, forkJoin } from 'rxjs'

@Component({
  selector: 'app-products-admin',
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
  templateUrl: './ProductsAdmin.component.html',
  styleUrls: ['./ProductsAdmin.component.scss']
})
export class ProductsAdminComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly onFocus = () => {
    if (!this.loading) {
      this.refresh()
    }
  }
  private readonly onVisibility = () => {
    if (
      typeof document !== 'undefined' &&
      document.visibilityState === 'visible'
    ) {
      this.refresh()
    }
  }

  loading = false
  readonly result$ = new BehaviorSubject<any>(null)
  readonly error$ = new BehaviorSubject<any>(null)
  selected = new Set<any>()
  confirmIds: any[] = []
  private hasInitialLoad = false

  constructor(
    private router: Router,
    private listService: GetProductsService
    , private deleteService: DeleteProductService
  ) {
  }

  ngOnInit() {
    this.setupAutoRefresh()
    this.ensureInitialLoad()
    this.setupAutoRefreshListeners()
  }

  ngAfterViewInit() {
    this.ensureInitialLoad()
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('focus', this.onFocus)
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.onVisibility)
    }
  }

  private setupAutoRefresh() {
    this.load()
  }

  private setupAutoRefreshListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', this.onFocus)
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibility)
    }
  }

  private ensureInitialLoad() {
    if (this.hasInitialLoad) return
    this.hasInitialLoad = true
    this.load()
  }

  load() {
    if (this.loading) return
    this.loading = true
    this.error$.next(null)
    this.listService
      .execute({}, {}, {})
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

  refresh() {
    this.load()
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

    const found = this.findFirstArray(value, 0, 5)
    return found ?? []
  }

  getColumns(raw?: any) {
    const rows = this.getRows(raw)
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

  toggleAll(checked: boolean) {
    this.selected.clear()
    if (!checked) return
    for (const row of this.getRows()) {
      const id = this.getRowId(row)
      if (id !== null && id !== undefined) {
        this.selected.add(id)
      }
    }
  }

  toggleRow(row: any, checked: boolean) {
    const id = this.getRowId(row)
    if (id === null || id === undefined) return
    if (checked) {
      this.selected.add(id)
    } else {
      this.selected.delete(id)
    }
  }

  isSelected(row: any) {
    const id = this.getRowId(row)
    if (id === null || id === undefined) return false
    return this.selected.has(id)
  }

  openDetail(row: any) {
    
    const id = this.getRowId(row)
    if (id === null || id === undefined) return
    this.router.navigate(['getProductById'], {
      state: { prefill: { id: id }, autoSubmit: true }
    })
  }

  openEdit(row: any) {
    
    this.router.navigate(['updateProduct'], {
      state: { prefill: row }
    })
  }

  confirmBulkDelete() {
    this.confirmDelete([...this.selected])
  }

  confirmDelete(ids: any[]) {
    this.confirmIds = ids.filter(
      id => id !== null && id !== undefined
    )
  }

  cancelDelete() {
    this.confirmIds = []
  }

  deleteConfirmed() {
    const ids = [...this.confirmIds]
    this.confirmIds = []
    if (!ids.length) return
    const calls = ids.map(id => this.deleteService.execute({ id: id }, {}, {}))
    if (!calls.length) return
    forkJoin(calls).subscribe({
      next: () => {
        this.removeFromResult(ids)
        ids.forEach(id => this.selected.delete(id))
      },
      error: error => {
        this.error$.next(error)
      }
    })
  }

  getRowId(row: any) {
    if (!row || typeof row !== 'object') return null
    if (row['id'] !== undefined) return row['id']
    if (row['id'] !== undefined) return row['id']
    return null
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

  private removeFromResult(ids: any[]) {
    const value = this.unwrapResult(this.result$.value)
    if (Array.isArray(value)) {
      this.result$.next(value.filter(item => !ids.includes(this.getRowId(item))))
      return
    }

    if (!value || typeof value !== 'object') return
    const key = this.findArrayKey(value)
    if (!key) return
    const nextArray = (value[key] as any[]).filter(
      item => !ids.includes(this.getRowId(item))
    )
    this.result$.next({ ...value, [key]: nextArray })
  }

  private findArrayKey(value: Record<string, any>) {
    const commonKeys = ['data', 'items', 'results', 'list', 'records', 'products']
    for (const key of commonKeys) {
      if (Array.isArray(value[key])) return key
    }
    for (const key of Object.keys(value)) {
      if (Array.isArray(value[key])) return key
    }
    return null
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

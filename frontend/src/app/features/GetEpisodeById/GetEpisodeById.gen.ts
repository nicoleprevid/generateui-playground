
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Injectable } from '@angular/core'
import { GetEpisodeByIdService } from './GetEpisodeById.service.gen'

@Injectable()
export class GetEpisodeByIdGen {
  form!: FormGroup
  formFields: any[] = []
  protected pathParamNames: string[] = []
  protected queryParamNames: string[] = []
  protected bodyFieldNames: string[] = []
  schema: any

  loading = false
  result: any = null
  error: any = null

  constructor(
    protected fb: FormBuilder,
    protected service: GetEpisodeByIdService
  ) {
    this.form = this.fb.group({})
  }

  setSchema(schema: any) {
    this.schema = schema
    this.formFields = this.buildFormFields(schema)
    this.form = this.fb.group({})
    for (const field of this.formFields) {
      const value = this.resolveDefault(field)
      const validators = field.required ? [Validators.required] : []
      this.form.addControl(
        field.name,
        this.fb.control(value, validators)
      )
    }
  }

  protected pick(source: Record<string, any>, keys: string[]) {
    const out: Record<string, any> = {}
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        out[key] = source[key]
      }
    }
    return out
  }

  protected isSelect(field: any) {
    if (field?.ui === 'select' || field?.ui === 'dropdown') return true
    return Array.isArray(field.options) && field.options.length > 0
  }

  protected getSelectOptions(field: any) {
    if (Array.isArray(field.options) && field.options.length > 0) {
      return field.options
    }
    return []
  }

  protected isCheckbox(field: any) {
    if (field?.ui === 'select' || field?.ui === 'dropdown') return false
    return field.type === 'boolean'
  }

  protected isTextarea(field: any) {
    return /body|description|content/i.test(field.name)
  }

  protected inputType(field: any) {
    switch (field.type) {
      case 'number':
      case 'integer':
        return 'number'
      default:
        return 'text'
    }
  }

  protected isInvalid(field: any) {
    const control = this.form.get(field.name)
    return !!(control?.invalid && (control.touched || control.dirty))
  }

  private buildFormFields(schema: any) {
    const fields = Array.isArray(schema?.fields)
      ? schema.fields
          .filter(
            (field: any) =>
              !field?.hidden && !field?.meta?.userRemoved
          )
      : []

    const queryParams = Array.isArray(schema?.api?.queryParams)
      ? schema.api.queryParams.filter(
          (field: any) =>
            !field?.hidden && !field?.meta?.userRemoved
        )
      : []

    const pathParamsSource = Array.isArray(schema?.api?.pathParams)
      ? schema.api.pathParams
      : this.extractPathParams(schema?.api?.endpoint ?? '').map(
          (name: string) => ({
            name,
            type: 'string',
            required: true,
            label: name,
            placeholder: name,
            source: 'path'
          })
        )

    const pathParams = pathParamsSource.filter(
      (field: any) =>
        !field?.hidden && !field?.meta?.userRemoved
    )

    this.pathParamNames = pathParams.map((p: any) => p.name)
    this.queryParamNames = queryParams.map((p: any) => p.name)
    this.bodyFieldNames = fields.map((f: any) => f.name)

    return [...pathParams, ...queryParams, ...fields]
  }

  private extractPathParams(endpoint: string) {
    const params = []
    const regex = /{([^}]+)}/g
    let match = regex.exec(endpoint)
    while (match) {
      params.push(match[1])
      match = regex.exec(endpoint)
    }
    return params
  }

  private resolveDefault(field: any) {
    if (field.defaultValue !== null && field.defaultValue !== undefined) {
      return field.defaultValue
    }
    switch (field.type) {
      case 'array':
        return []
      case 'boolean':
        return false
      case 'number':
      case 'integer':
        return null
      default:
        return ''
    }
  }
}

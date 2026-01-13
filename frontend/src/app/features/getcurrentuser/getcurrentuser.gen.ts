
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Injectable } from '@angular/core'
import { GetCurrentUserService } from './getcurrentuser.service.gen'

@Injectable()
export class GetCurrentUserGen {
  constructor(
    protected fb: FormBuilder,
    protected service: GetCurrentUserService
  ) {
    this.form = this.fb.group({

    })
  }

  form!: FormGroup
  loading = false
  result: any = null
  error: any = null

  protected pick(source: Record<string, any>, keys: string[]) {
    const out: Record<string, any> = {}
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        out[key] = source[key]
      }
    }
    return out
  }
}
